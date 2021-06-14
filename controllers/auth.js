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


  static async login(req, res) {
    try {

      const currentUser = await db.User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!currentUser.confirmed_at) {
        return res.status(400).json({ message: 'please verify your email address' })
      }

      const passwordVerify = await bcrypt.compare(req.body.password, currentUser.password)
      if (!passwordVerify) {
        return res.status(400).json({ message: 'invalid password' })
      }

      const payload = JSON.parse(JSON.stringify(currentUser))
      res.status(200).json(currentUser)

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = AuthController
