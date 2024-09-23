const { parseBodyAuth } = require('./helpers.js')
const { register, login, getUsers } = require('./controllerAuth.js')
const express = require('express')
const authMiddleware = require('./middlware/authMiddleware.js')
const superMiddleware = require('./middlware/roleMiddleware.js')



const routerAuth = express.Router()

routerAuth.post('/register', function (req, res) {
  parseBodyAuth(req, res, register)
})


routerAuth.post('/login', function (req, res) {
  parseBodyAuth(req, res, login)
})

routerAuth.get('/users', authMiddleware, getUsers)

module.exports = {
  routerAuth
}

