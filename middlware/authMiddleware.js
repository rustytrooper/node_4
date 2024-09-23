const jwt = require('jsonwebtoken')
const { secret } = require('../config')


module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401).send('пользователь не авторизован')
    }
    const decodedData = jwt.verify(token, secret)
    req.user = { ...decodedData, super: decodedData.super }
    next()
  } catch (e) {
    res.status(403).send('пользователь не авторизован')
  }
}