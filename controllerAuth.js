const { register } = require('./authControllers/registerCntrlr');
const { login } = require('./authControllers/loginCntrlr');
const { getUsers } = require('./authControllers/getUsersCntrlr')


module.exports = {
  register,
  login,
  getUsers
}