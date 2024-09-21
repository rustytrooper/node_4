const fs = require('fs')
const { parseURL } = require('../helpers')

function read(err, req, res, params) {
  const { url, parameters } = parseURL(req.url)
  const readStream = fs.createReadStream('top10.json', 'utf-8')

  let data = '';
  readStream.on('data', function (chunk) {
    data += chunk
  })
  readStream.on('end', function () {
    try {
      const objJson = JSON.parse(data);
      const neededFilm = objJson.find(film => film.id === +parameters.id)
      readStream.close()
      res.send(neededFilm)
    } catch (err) {
      res.status(500).send('Error while reading film')
    }

  })

}

module.exports = {
  read
}