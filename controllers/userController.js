const bcrypt = require('bcrypt')
const db = require('../db/models')
const { baseResponse:RES } = require('../helpers')

class userController {

  static async getUsers(req, res, next) {
    try {

      let data, message

      if (req.user.role === 'admin') {
        data = await db.User.findAll()
        message = 'Retrieving all users succeed.'
      }

      if (req.user.role === 'user') {
        data = await db.User.findByPk(req.user.id_user)
        message = 'Retrieving your data'
      }

      res.status(200).json(RES.success(message, data, res.statusCode))

    } catch (error) {
      next(error)
    }
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


  static async deleteUserById(req, res, next) {
    try {

      const user = await db.User.destroy({
        where: {
          id_user: req.params.id
        },
        returning: true,
        plain: true
      })

      console.log(user)

      res.status(200).json(RES.success(`User ${ user.email } has been deleted.`, user, res.statusCode))

    } catch (error) {
      next(error)
    }
  }

}

module.exports = userController
