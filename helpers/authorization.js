function permit(...permittedRoles) {
  return (req, res, next) => {

    const { username, role } = req.user

    if (username && permittedRoles.includes(role)) {
      next()  // role is allowed, so continue on the next middleware
    } else {
      res.status(403).json({message: "user is forbidden to access this endpoint"})  // user is forbidden
      throw new Error('user is forbidden')
    }
  }
}


module.exports = permit
