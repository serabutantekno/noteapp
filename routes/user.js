const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const{ jwtAuthentication:jwt, authorization:roles } = require('../helpers')

router.get('/', jwt, roles('admin'), userController.getUsers)

module.exports = router
