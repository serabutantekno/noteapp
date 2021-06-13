const express = require('express')
const router = express.Router()
const { AuthController } = require('../controllers')

router.post('/registrasi', AuthController.register)

module.exports = router
