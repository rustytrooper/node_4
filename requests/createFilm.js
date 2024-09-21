const fs = require('fs')

function createFilm(err, req, res, params) {
  const readStream = fs.createReadStream('top10.json', 'utf-8')

  let data = ''

  readStream.on('data', function (chunk) {
    data += chunk
  })

  readStream.on('end', function () {
    try {
      if (!params.name || !params.alternativeName || !params.rating.kp || !params.year || !params.votes.kp) {
        res.status(500).send('не хватает данных')
      }
      const jsonFile = JSON.parse(data);
      const newFilm = {
        id: jsonFile.length + 1,
        name: params.name,
        alternativeName: params.alternativeName,
        rating: {
          kp: params.rating.kp
        },
        year: params.year,
        votes: {
          kp: params.votes.kp
        },
        poster: params.poster
      };
      jsonFile.push(newFilm);
      jsonFile.sort((a, b) => a.rating.kp - b.rating.kp);

      const newFileJson = JSON.stringify(jsonFile, null, 2);

      const writeStream = fs.createWriteStream('top10.json', { flags: 'w' });

      writeStream.write(newFileJson);
      writeStream.end();

      writeStream.on('finish', function () {
        console.log('Фильм успешно добавлен и файл обновлен');
      });

      writeStream.on('error', function (err) {
        console.error('Ошибка при записи файла:', err);
      });
      res.send(newFilm)
    } catch (err) {
      console.error('Ошибка при обработке данных:', err);
    }
  });

}

module.exports = {
  createFilm
}