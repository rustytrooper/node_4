const fs = require('fs')

function getUsers(req, res) {
  try {
    const readStream = fs.createReadStream('manager.json');
    let data = '';

    readStream.on('data', function (chunk) {
      data += chunk;
    })

    readStream.on('end', function () {
      const usersJson = JSON.parse(data);
      res.send(usersJson)
      readStream.close()
    })
  } catch (e) {
    res.status(500).send('Ошибка на стороне сервера', e)
  }
}

module.exports = {
  getUsers
}