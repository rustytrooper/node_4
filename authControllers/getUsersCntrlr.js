const fs = require('fs')

function getUsers(req, res) {
  try {
    res.send('server works')
  } catch (e) {
    res.status(500).send('Ошибка на стороне сервера', e)
  }
}

module.exports = {
  getUsers
}