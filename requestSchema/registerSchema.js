const Joi = require('joi')

function registerSchema(req, res, next) {
  return Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    username: Joi.string().min(4).required(),
    role: Joi.string().valid('admin', 'user').required()
  })
}

module.exports = registerSchema
