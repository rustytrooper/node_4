const fs = require('fs')
const bcryptjs = require('bcryptjs')
const { generateAccessToken } = require('../helpers');
const { json } = require('express');

function login(err, req, res, Email, password) {
  try {
    const readStream = fs.createReadStream('manager.json', 'utf-8');

    let data = '';

    readStream.on('data', function (chunk) {
      data += chunk
    })

    readStream.on('end', function () {
      const usersObj = JSON.parse(data);

      const candidate = usersObj.find(user => user.Email === Email && bcryptjs.compareSync(password, user.password))
      if (!candidate) {
        return res.status(401).send('Неверный email или пароль');
      }

      const token = generateAccessToken(candidate._id, candidate.super)
      return res.json({ token })
    })
  } catch (e) {
    res.status(500).send('Ошибка на стороне сервера:', e)
  }
}

module.exports = {
  login
}