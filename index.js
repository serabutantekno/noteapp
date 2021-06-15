const express = require('express')
const app = express()
const port = 3000
const Sentry = require('@sentry/node')
require('dotenv').config()

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0
})

app.use(express.json())

app.use(Sentry.Handlers.requestHandler())

app.use('/api/', require('./routes'))

app.use(Sentry.Handlers.errorHandler())

app.use(require('./helpers').errorCatcher)

app.listen(port, () => {
  console.log(`todoapp listening at http://localhost:${ port }`)
})
