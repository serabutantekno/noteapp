const express = require('express')
const router = express.Router()
const { noteController } = require('../controllers')
const { jwtAuthentication:jwt, authorization:roles, joiRequestValidator:validateReq } = require('../helpers')
const { createNoteSchema } = require('../requestSchema')

router.post('/', jwt, roles('admin', 'user'), validateReq(createNoteSchema()), noteController.createNote)

module.exports = router
