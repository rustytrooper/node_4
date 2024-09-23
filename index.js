const express = require('express')
const { parseBody } = require('./helpers.js')
const { createFilm } = require('./requests/createFilm.js')
const { updateFilm } = require('./requests/updateFilm.js')
const { deleteFilm } = require('./requests/deleteFilm.js')
const { readAll } = require('./requests/readAll.js')
const { read } = require('./requests/read.js')
const { routerAuth } = require('./routesAuth.js')
const authMiddleware = require('./middlware/authMiddleware.js')
const roleMiddleware = require('./middlware/roleMiddleware.js')

const app = express();

app.use('/api/auth', routerAuth)
app.use(authMiddleware)


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/api/films/create', roleMiddleware, function (req, res) {
  parseBody(req, res, createFilm)
})

app.post('/api/films/update', roleMiddleware, function (req, res) {
  parseBody(req, res, updateFilm)
})

app.post('/api/films/delete', roleMiddleware, function (req, res) {
  parseBody(req, res, function (err, params) {
    deleteFilm(err, req, res, params);
  });
});

app.get('/api/films/readall', authMiddleware, function (req, res) {
  parseBody(req, res, function (err, params) {
    readAll(err, req, res, params)
  })
})

app.get('/api/films/read', authMiddleware, function (req, res) {
  parseBody(req, res, function (err, params) {
    read(err, req, res, params)
  })
})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})