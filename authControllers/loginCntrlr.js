const fs = require('fs')

function login(req, res, mail, pswrd) {
  try {

  } catch (e) {
    res.status(500).send('Ошибка на стороне сервера:', e)
  }
}

module.exports = {
  login
}