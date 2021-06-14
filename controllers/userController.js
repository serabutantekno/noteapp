const db = require('../db/models')

class userController {

  static async getUsers(req, res) {
    const users = await db.User.findAll()
    res.status(200).json({ message: 'retrieving all users succeed', data: users })
  }

}

module.exports = userController
