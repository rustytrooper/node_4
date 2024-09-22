const express = require('express')
const { parseBody } = require('./helpers.js')
const { createFilm } = require('./requests/createFilm.js')
const { updateFilm } = require('./requests/updateFilm.js')
const { deleteFilm } = require('./requests/deleteFilm.js')
const { readAll } = require('./requests/readAll.js')
const { read } = require('./requests/read.js')
const { routerAuth } = require('./routesAuth.js')

const app = express();

app.use('/api/auth', routerAuth)


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/api/films/create', function (req, res) {
  parseBody(req, res, createFilm)
})

app.post('/api/films/update', function (req, res) {
  parseBody(req, res, updateFilm)
})

app.post('/api/films/delete', function (req, res) {
  parseBody(req, res, function (err, params) {
    deleteFilm(err, req, res, params);
  });
});


app.get('/api/films/readall', function (req, res) {
  parseBody(req, res, readAll)
})

app.get('/api/films/read', function (req, res) {
  parseBody(req, res, read)
})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})