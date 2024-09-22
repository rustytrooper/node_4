const { Router } = require('express')
const { parseBodyAuth } = require('./helpers.js')
const { register, login } = require('./controllerAuth.js')

const routerAuth = new Router();

routerAuth.post('/register', function (req, res) {
  parseBodyAuth(req, res, register)
})

routerAuth.post('/login', function (req, res) {
  parseBodyAuth(req, res, login)
})

module.exports = {
  routerAuth
}