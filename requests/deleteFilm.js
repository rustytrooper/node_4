const fs = require('fs')
const { parseURL } = require('../helpers.js')


function deleteFilm(err, req, res, params) {
  const { url, parameters } = parseURL(req.url);
  const readStream = fs.createReadStream('top10.json', 'utf-8');
  let data = '';

  readStream.on('data', function (chunk) {
    data += chunk
  })

  readStream.on('end', function () {
    try {
      const jsonObj = JSON.parse(data);
      const filteredFilm = jsonObj.filter(film => film.id !== +parameters.id)
      const newJsonObj = JSON.stringify(filteredFilm, null, 2)

      readStream.close()

      const writeStream = fs.createWriteStream('top10.json', { flags: 'w' })
      writeStream.write(newJsonObj)

      writeStream.end()
      res.send(newJsonObj)
    } catch (err) {
      console.error('Ошибка при обработке данных:', err);
    }
  })
}

module.exports = {
  deleteFilm
}