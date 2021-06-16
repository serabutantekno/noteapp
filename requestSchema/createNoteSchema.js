const Joi = require('joi')

function createNote() {
  return Joi.object({
    id_user: Joi.number(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    type: Joi.valid('idea', 'info', 'credential', 'reminder', 'plan', 'journal').required(),
    secret: Joi.string()
  })
}

module.exports = createNote
