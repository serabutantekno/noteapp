const express = require('express')
const router = express.Router()
const { noteController } = require('../controllers')
const{ jwtAuthentication:jwt, authorization:roles } = require('../helpers')

router.post('/', jwt, roles('admin', 'user'), noteController.createNote)

module.exports = router
