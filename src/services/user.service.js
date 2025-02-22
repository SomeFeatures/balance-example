const { Op } = require('sequelize');
const { User } = require('../models/user.model');

/**
 * User Service.
 */
class UserService {
  /**
   * Update balances.
   *
   * @param {number} userId
   * @param {number} amount
   * @returns {Promise<User>}
   */
  static async updateBalance(userId, amount) {
    const [rows, [updatedUser]] = await User.update(
      { balance: User.sequelize.literal(`balance + ${amount}`) },
      {
        where: {
          [Op.and]: [{ id: userId }, User.sequelize.literal(`"balance" + ${amount} >= 0`)],
        },
        returning: true,
      },
    );

    if (rows === 0) {
      throw new Error('Insufficient funds');
    }

    return updatedUser;
  }
}

module.exports = UserService;
