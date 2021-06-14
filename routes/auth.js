const express = require('express')
const router = express.Router()
const { AuthController } = require('../controllers')

router.post('/registrasi', AuthController.register)
router.post('/login', AuthController.login)
router.get('/verify/:token', AuthController.emailVerification)

module.exports = router
