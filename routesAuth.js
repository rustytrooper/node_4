const { parseBodyAuth } = require('./helpers.js')
const { register, login, getUsers } = require('./controllerAuth.js')
const express = require('express')
const { check } = require('express-validator')



const routerAuth = express.Router()

routerAuth.post('/register', [
  check('Email', 'Введите имя пользователя').notEmpty(),
  check('password', "Пароль должен содержать от 4 до 10 символов").isLength({ min: 4, max: 10 })
], function (req, res) {
  parseBodyAuth(req, res, register)
})

routerAuth.post('/login', function (req, res) {
  parseBodyAuth(req, res, login)
})

routerAuth.get('/users', getUsers)

module.exports = {
  routerAuth
}

