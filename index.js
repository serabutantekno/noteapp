const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const routes = require('./routes/auth')
app.use('/api/', routes)

app.listen(port, () => {
  console.log(`todoapp listening at http://localhost:${ port }`)
})
