const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const{ jwtAuthentication:jwt, authorization:roles } = require('../helpers')

router.get('/', jwt, roles('admin'), userController.getUsers)
router.get('/:id', jwt, roles('admin'), userController.getUserById)

module.exports = router
