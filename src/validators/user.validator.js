const Joi = require('joi');

const updateBalanceSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().required(),
});

module.exports = { updateBalanceSchema };
