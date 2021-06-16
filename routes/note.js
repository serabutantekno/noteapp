const express = require('express')
const router = express.Router()
const { noteController } = require('../controllers')
const { jwtAuthentication:jwt, authorization:roles, joiRequestValidator:validateReq } = require('../helpers')
const { createNoteSchema } = require('../requestSchema')

router.post('/', jwt, roles('admin', 'user'), validateReq(createNoteSchema()), noteController.createNote)
router.delete('/:id', jwt, roles('admin', 'user'), noteController.deleteNoteById)

module.exports = router
