const fs = require('fs')
const bcryptjs = require('bcryptjs')

function register(err, req, res, Email, password) {
  try {
    if (!Email) {
      res.status(400).send('Введите почту пользователя')
    }
    if (!password) {
      res.status(400).send('Введите пароль пользователя')
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