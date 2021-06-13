const bcrypt = require('bcrypt')
const db = require('../db/models')
const sendMail = require('./sendMailController')

class AuthController {

  static async register(req, res) {
    try {
      console.log(req.body)
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const data = await db.User.create(Object.assign(req.body, { password: hashedPassword }))
      const encrypted_data = Buffer.from((data.id + ':' + data.email), 'utf8').toString('base64')
      sendMail(data.email, 'emailVerification', encrypted_data)
      res.json(data)
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = AuthController
