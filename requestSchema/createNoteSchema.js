const Joi = require('joi')

function createNote() {
  return Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    type: Joi.valid('idea', 'info', 'credential', 'reminder', 'plan', 'journal').required(),
    secret: Joi.string()
  })
}

module.exports = createNote
