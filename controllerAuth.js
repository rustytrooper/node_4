const { register } = require('./authControllers/registerCntrlr');
const { login } = require('./authControllers/loginCntrlr');


module.exports = {
  register,
  login
}