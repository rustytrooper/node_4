const fs = require('fs')
const { parseURL } = require('../helpers.js')

function updateFilm(err, req, res, params) {
  const { url, parameters } = parseURL(req.url);
  const fs = require('fs');

  const readStream = fs.createReadStream('top10.json', 'utf-8');
  let data = '';

  readStream.on('data', function (chunk) {
    data += chunk;
  });

  readStream.on('end', function () {
    try {
      const objJson = JSON.parse(data);
      const updatedFilms = objJson.map(film => {
        if (film.id === +parameters.id) {
          return {
            id: film.id,
            name: params?.name || film.name,
            alternativeName: params?.alternativeName || film.alternativeName,
            rating: {
              kp: params?.rating?.kp || film.rating.kp
            },
            year: params?.year || film.year,
            votes: {
              kp: params?.votes?.kp || film.votes.kp
            },
            poster: params?.poster || film.poster
          };
        }
        return film;
      });

      const newObjJson = JSON.stringify(updatedFilms, null, 2);

      readStream.close();

      const writeStream = fs.createWriteStream('top10.json', { flags: 'w' });
      writeStream.write(newObjJson);

      writeStream.end();
      res.send(updatedFilms);
    } catch (err) {
      console.error('Ошибка при обработке данных:', err);
      res.status(500).send('Внутренняя ошибка сервера');
    }
  });
}

module.exports = {
  updateFilm
};


