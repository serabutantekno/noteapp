const express = require('express')
const router = express.Router()

router.use('/', require('./auth'))
router.use('/users', require('./user'))
router.use('/notes', require('./note'))

module.exports = router
