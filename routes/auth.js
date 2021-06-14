const express = require('express')
const router = express.Router()
const { AuthController } = require('../controllers')

router.post('/registrasi', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router
