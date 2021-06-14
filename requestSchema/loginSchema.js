const Joi = require('joi')

function loginSchema(req, res, next) {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  })
}

module.exports = loginSchema
