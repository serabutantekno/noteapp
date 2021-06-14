const express = require('express')
const router = express.Router()
const { AuthController } = require('../controllers')
const { joiRequestValidator } = require('../helpers')
const { loginSchema, registerSchema } = require('../requestSchema')

router.post('/registrasi', joiRequestValidator(registerSchema()), AuthController.register)
router.post('/login', joiRequestValidator(loginSchema()), AuthController.login)
router.get('/verify/:token', AuthController.emailVerification)

module.exports = router
