const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.use('/api/', require('./routes'))
app.use(require('./helpers').errorCatcher)

app.listen(port, () => {
  console.log(`todoapp listening at http://localhost:${ port }`)
})
