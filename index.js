const express = require('express')
const app = express()
const port = 3000

const db = require('./db/config/database')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(db.development)

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(port, () => {
  console.log(`todoapp listening at http://localhost:${ port }`)
})
