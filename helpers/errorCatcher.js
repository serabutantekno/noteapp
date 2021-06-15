const errorCatcher = (err, req, res, next) => {
  res.status(404).json({
    message: err.message,
    stack_error: err
  })
}

module.exports = errorCatcher
