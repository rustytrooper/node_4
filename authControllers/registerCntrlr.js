const fs = require('fs')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

function register(err, req, res, Email, password) {
  try {
    const errors = validationResult(Email, password)
    if (!errors.isEmpty()) {
      return res.status(400).send("Недостаточно данных для регистрации")
    }
    const readStream = fs.createReadStream('manager.json', 'utf-8')
    const userToFind = {
      Email,
      password
    }

    let data = ''
    readStream.on('data', function (chunk) {
      data += chunk
    })

    readStream.on('end', function (err) {
      if (err) {
        res.status(400).send('Ошибка при чтении файла пользователей')
      }
      const usersObj = JSON.parse(data);
      const existingUser = usersObj.find(user => user.email === userToFind.Email && user.password === userToFind.password);
      if (existingUser) {
        res.status(400).send(`Ошибка регистрации: пользователь с почтой ${userToFind.Email} уже зарегистрирован в системе`)
      }

      const hashPswrd = bcryptjs.hashSync(password, 7);
      const newUser = {
        id: usersObj.length + 1,
        Email,
        password: hashPswrd,
        super: false
      }
      usersObj.push(newUser);
      readStream.close()
      const usersJson = JSON.stringify(usersObj, null, 2)


      const writeStream = fs.createWriteStream('manager.json', { flags: 'w' })
      writeStream.write(usersJson)
      writeStream.end()
      res.send(usersJson)
      writeStream.on('finish', function () {
        console.log('Пользователь успешно зарегистрирован и файл обновлен');
      });

    })

  } catch (e) {
    res.status(500).send(`Ошибка на стороне сервера при регистрации: ${e}`)
  }
}

module.exports = {
  register
}