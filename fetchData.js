const axios = require('axios')
const fs = require('fs')
const apiKey = '4J20RM9-C6F4S2S-Q857CPN-T120T3Q'
const link = 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&&id=string&name=string&alternativeName=string&logo.url=string&rating.kp=string&votes.kp=string&budget.value=string&fees.world=string&poster.url=string'

axios.get(link, {
  headers: {
    'X-API-KEY': apiKey
  },
}).then(function (res) {
  const jsonRes = JSON.stringify(res.data, null, 2)
  fs.writeFile('top250.json', `${jsonRes}`, function (err) {
    if (err) {
      throw new Error('error while writing file')
    }
  })
})

