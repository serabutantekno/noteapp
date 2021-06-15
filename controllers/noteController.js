const db = require('../db/models')
const { baseResponse:RES } = require('../helpers')

class noteController {

  static async createNote(req, res, next) {
    try {

      const newNote = await db.Note.create(req.body)
      res.status(201).json(RES.success(`New note '${ newNote.title }' created successfully.`, newNote, res.statusCode))

    } catch (error) {
      next(error)
    }
  }

}

module.exports = noteController
