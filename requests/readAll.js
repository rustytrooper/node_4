const fs = require('fs')

function readAll(err, req, res, params) {
  const readStream = fs.createReadStream('top10.json', 'utf-8')
  let data = '';

  readStream.on('data', function (chunk) {
    data += chunk
  })

  readStream.on('end', function () {
    try {
      const jsonObj = JSON.parse(data);
      readStream.close();
      res.send(jsonObj);
    } catch (err) {
      console.error('Ошибка при обработке данных:', err);
      res.status(500).send('Ошибка сервера');
    }

  })
}

module.exports = {
  readAll
}