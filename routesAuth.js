// const { Router } = require('express')
const { parseBodyAuth } = require('./helpers.js')
const { register, login, getUsers } = require('./controllerAuth.js')
const express = require('express')

// const routerAuth = new Router();

const routerAuth = express.Router()

routerAuth.post('/register', function (req, res) {
  parseBodyAuth(req, res, register)
})

routerAuth.post('/login', function (req, res) {
  parseBodyAuth(req, res, login)
})

routerAuth.get('/users', getUsers)

module.exports = {
  routerAuth
}

