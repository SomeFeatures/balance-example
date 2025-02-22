/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/check-tag-names */
const UserService = require('../services/user.service');

/**
 * User controller.
 */
class UserController {
  /**
   * UserController.
   *
   * @param req Request.
   * @param res Response.
   * @swagger
   * /users/balance:
   *   patch:
   *     summary: Update user's balance
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: integer
   *               amount:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Balance updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     balance:
   *                       type: integer
   *       400:
   *         description: Validation error or insufficient funds
   */
  static async updateUserBalance(req, res) {
    try {
      const { userId, amount } = req.body;
      const updatedUser = await UserService.updateBalance(userId, amount);
      return res.json({
        message: 'Balance updated',
        user: {
          id: updatedUser.id,
          balance: updatedUser.balance,
        },
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
