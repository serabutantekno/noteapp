const db = require('../db/models')
const { baseResponse:RES } = require('../helpers')

class noteController {

  static async getNotes(req, res, next) {
    try {

      let currentUserId

      if (req.user.role === 'user') {
        currentUserId = req.user.id_user
      }

      const { count, rows:notes } = await db.Note.findAndCountAll({
        attributes: ['id_notes', 'title', 'type', 'created_at', 'updated_at'],
        where: currentUserId ? {
          id_user: currentUserId
        } : null
      })

      res.status(200).json(RES.success(`All notes from a total of ${ count } notes retrieved successfully.`, notes, res.statusCode))

    } catch (error) {
      next(error)
    }
  }

  static async createNote(req, res, next) {
    try {

      let id_user

      if (req.user.role === 'admin') {
        id_user = Object.keys(req.body).includes('id_user') ? req.body.id_user : req.user.id_user
      }

      if (req.user.role === 'user') {
        id_user = req.user.id_user
      }

      const newNote = await db.Note.create(Object.assign(req.body, { id_user: id_user }))
      res.status(201).json(RES.success(`New note '${ newNote.title }' created successfully.`, newNote, res.statusCode))

    } catch (error) {
      next(error)
    }
  }

  static async deleteNoteById(req, res, next) {
    try {

      let currentUserId

      if (req.user.role === 'user') {
        currentUserId = req.user.id_user
      }

      const deletedNote = await db.Note.destroy({
        where: Object.assign({
          id_notes: req.params.id
        }, { id_user: currentUserId ? currentUserId : null }),
        returning: true,
        plain: true
      })

      res.status(200).json(RES.success(`The note '${ deletedNote }' is deleted successfully.`, deletedNote, res.statusCode))

    } catch (error) {
      next(error)
    }
  }

}

module.exports = noteController
