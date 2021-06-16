const express = require('express')
const router = express.Router()
const { noteController } = require('../controllers')
const { jwtAuthentication:jwt, authorization:roles, joiRequestValidator:validateReq } = require('../helpers')
const { createNoteSchema } = require('../requestSchema')

router.get('/', jwt, roles('admin', 'user'), noteController.getNotes)
router.post('/', jwt, roles('admin', 'user'), validateReq(createNoteSchema()), noteController.createNote)
router.get('/:id', jwt, roles('admin', 'user'), noteController.getNoteById)
router.put('/:id', jwt, roles('admin', 'user'), noteController.updateNoteById)
router.delete('/:id', jwt, roles('admin', 'user'), noteController.deleteNoteById)

module.exports = router
