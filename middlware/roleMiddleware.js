const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401).send('пользователь не авторизован')
    }
    if (!req.user || !req.user.super) {
      res.status(401).send('Доступ ограничен');
    }
    next()
  } catch (e) {
    res.status(403).send('пользователь не авторизован')
  }
}