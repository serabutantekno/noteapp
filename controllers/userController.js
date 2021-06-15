const bcrypt = require('bcrypt')
const db = require('../db/models')
const { baseResponse:RES } = require('../helpers')

class userController {

  static async getUsers(req, res) {
    const users = await db.User.findAll()
    res.status(200).json({ message: 'retrieving all users succeed', data: users })
  }


  static async getUserById(req, res, next) {
    try {
      const user = await db.User.findOne({
        where: {
          id_user: req.params.id
        }
      })
      user.password = undefined
      res.status(200).json(RES.success(`User ${ user.email } retrieved successfully.`, user, res.statusCode))
    } catch (error) {
      next(error)
    }
  }


  static async updateUserById(req, res, next) {
    try {

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
      }

      const [ _, user ] = await db.User.update(req.body, {
        where: {
          id_user: req.params.id
        },
        returning: true,
        plain: true
      })

      user.password = undefined

      res.status(200).json(RES.success(`User ${ user.email } updated successfully.`, user, res.statusCode))

    } catch (error) {
      next(error)
    }
  }

}

module.exports = userController
