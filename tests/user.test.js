const request = require('supertest');
const { app } = require('../src/app');
const sequelize = require('../src/utils/sequelize');
const { User } = require('../src/models/user.model');

describe('User Balance Update Endpoint', () => {
  let server;
  let testUserId;

  beforeAll(async () => {
    server = app;

    await sequelize.sync({ force: true });

    const user = await User.create({ balance: 10000 });
    testUserId = user.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Validation checks', () => {
    it('should fail if userId is missing', async () => {
      const res = await request(server).patch('/users/balance').send({ amount: 100 });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should fail if amount is missing', async () => {
      const res = await request(server).patch('/users/balance').send({ userId: testUserId });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should fail if userId is not positive integer', async () => {
      const res = await request(server).patch('/users/balance').send({ userId: -1, amount: 100 });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should fail if amount is not integer', async () => {
      const res = await request(server).patch('/users/balance').send({ userId: testUserId, amount: 'abc' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });
  });

  describe('Successful updates', () => {
    it('should increase balance by a positive amount', async () => {
      const res = await request(server).patch('/users/balance').send({ userId: testUserId, amount: 200 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Balance updated');
      expect(res.body.user.balance).toBe(10200);
    });

    it('should decrease balance by a small positive amount', async () => {
      const res = await request(server).patch('/users/balance').send({ userId: testUserId, amount: -100 });
      expect(res.statusCode).toBe(200);
      expect(res.body.user.balance).toBe(10100);
    });
  });

  describe('Edge cases', () => {
    it('should not allow balance to go negative', async () => {
      const amountToWithdraw = -(10100 + 1);
      const res = await request(server).patch('/users/balance').send({ userId: testUserId, amount: amountToWithdraw });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toMatch(/Insufficient funds/i);

      const userAfter = await User.findByPk(testUserId);
      expect(userAfter.balance).toBe(10100);
    });

    it('should fail if user does not exist', async () => {
      const nonExistentUserId = 9999999;
      const res = await request(server).patch('/users/balance').send({ userId: nonExistentUserId, amount: -10 });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toMatch(/Insufficient funds/i);
    });
  });

  describe('Concurrency test (stress test)', () => {
    it('should handle concurrent requests without going below zero', async () => {
      await User.update({ balance: 10000 }, { where: { id: testUserId } });

      const concurrentRequests = 10;
      const amountToWithdraw = -2000;

      const requests = [];
      for (let i = 0; i < concurrentRequests; i++) {
        requests.push(request(server).patch('/users/balance').send({ userId: testUserId, amount: amountToWithdraw }));
      }

      const results = await Promise.allSettled(requests);

      let successCount = 0;
      let failCount = 0;

      results.forEach((r) => {
        if (r.status === 'fulfilled') {
          if (r.value.statusCode === 200) {
            successCount += 1;
          } else {
            failCount += 1;
          }
        } else {
          failCount += 1;
        }
      });

      expect(successCount).toBe(5);
      expect(failCount).toBe(5);

      const finalUser = await User.findByPk(testUserId);
      expect(finalUser.balance).toBe(0);
    });
  });
});
