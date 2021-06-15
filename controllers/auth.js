const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/models')
const sendMail = require('./sendMailController')
const { baseResponse:RES } = require('../helpers')

class AuthController {

  static async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const data = await db.User.create(Object.assign(req.body, { password: hashedPassword }))
      const encrypted_data = Buffer.from((data.id_user + ':' + data.email), 'utf8').toString('base64')
      sendMail(data.email, 'emailVerification', encrypted_data)
      console.log(data)
      data.password = undefined
      res.status(201).json(RES.success(`User with email ${ data.email } registered successfully.`, data, res.statusCode))
    } catch (error) {
      console.log(error)
    }
  }


  static async emailVerification(req, res) {
    try {
      const decrypted_data = Buffer.from(req.params.token, 'base64').toString('utf8')
      const [id, email] = decrypted_data.split(':')

      const user = await db.User.findOne({
        where: {
          id_user: id
        }
      })

      if (user && user.email === email) {
        user.confirmed_at = new Date()
        user.save()
        res.status(200).json(RES.success(`The email ${ email } is verified successfully. Now you can log in.`, {}, res.statusCode))
      }

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

      if (!currentUser) {
        return res.status(404).json(RES.error('User not found or deleted.', res.statusCode))
      }

      if (!currentUser.confirmed_at) {
        return res.status(400).json({ message: 'please verify your email address' })
      }

      const passwordVerify = await bcrypt.compare(req.body.password, currentUser.password)
      if (!passwordVerify) {
        return res.status(400).json({ message: 'invalid password' })
      }

      const payload = JSON.parse(JSON.stringify(currentUser))
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })

      delete payload.password

      res.status(200).json(RES.success('Login succeed.', Object.assign(payload, { token: token }), res.statusCode))

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = AuthController
