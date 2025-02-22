/* eslint-disable jsdoc/check-tag-names */
const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const validateRequest = require('../middlewares/validateRequest');
const { updateBalanceSchema } = require('../validators/user.validator');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
router.patch('/balance', validateRequest(updateBalanceSchema), UserController.updateUserBalance);

module.exports = router;
