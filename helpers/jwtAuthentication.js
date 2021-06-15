const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: err.message
        })
      }

      delete user.password

      req.user = JSON.parse(JSON.stringify(user))
      next()
    })
  } else {
    res.status(401).json({
      message: 'token missing'
    })
  }
}

module.exports = authenticateToken
