const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const{ jwtAuthentication:jwt } = require('../helpers')

router.get('/', jwt, userController.getUsers)

module.exports = router
