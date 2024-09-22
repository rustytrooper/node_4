function parseBody(req, res, cb) {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    const data = Buffer.concat(body).toString();
    if (data) {
      const params = JSON.parse(data)
      cb(null, req, res, params)
    } else {
      cb(null, null)
    }

  })
}

function parseURL(url) {
  const [parsedUrl, paramsString] = url.split('?');
  let parsedParams = null;

  if (paramsString) {
    const splittedArr = paramsString.split('&')
    parsedParams = splittedArr.reduce((acc, el) => {
      const [key, value] = el.split('=')
      acc[key] = value
      return acc
    }, {})
  }

  return {
    url: parsedUrl,
    parameters: parsedParams
  }
}

function parseBodyAuth(req, res, cb) {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    const data = Buffer.concat(body).toString();
    if (data) {
      let params = {};
      try {
        params = JSON.parse(data);
      } catch (error) {
        res.status(400).send('Ошибка разбора JSON данных');
        return;
      }

      const { Email, password } = params;

      cb(null, req, res, Email, password);
    } else {
      res.status(400).send('Недостаточно данных для обработки');
    }
  });
}


module.exports = {
  parseBody,
  parseURL,
  parseBodyAuth
}