const fs = require('fs')


function register(req, res, mail, pswrd) {
  try {
    const readStream = fs.createReadStream('manager.json', 'utf-8')
    const userToFind = {
      email: mail,
      password: pswrd
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
      const existingUser = usersObj.find(user => user.email === userToFind.email && user.password === userToFind.password);
      if (existingUser) {
        res.status(400).send(`Ошибка регистрации: пользователь с почтой ${userToFind.email} уже зарегистрирован в системе`)
      }

      const newUser = {
        id: usersObj.length + 1,
        email: mail,
        password: pswrd,
        super: false
      }
      usersObj.push(newUser);
      readStream.close()
      const usersJson = JSON.stringify(usersObj, null, 2);

      const writeStream = fs.createWriteStream('manager.json')
      writeStream.write(usersJson, function (err) {
        if (err) res.status(400).send('ошиюка при записи нового пользователя')
      })
    })

  } catch (e) {
    res.status(500).send('Ошибка на стороне сервера при регистрации:', e)
  }
}

module.exports = {
  register
}