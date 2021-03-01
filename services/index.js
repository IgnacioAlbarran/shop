const jwt = require('jwt-simple');
const moment = require('moment');
const secrets = require('../secrets')

  function auth(user){
    const payload = {
      sub: user.id,
      lev: user.level,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, secrets.SECRET_TOKEN)
  }

  const USUARIOS = {
    "inactive": 0,
    "user": 1,
    "seller": 2,
    "admin": 3,
    "superadmin": 4
  }

module.exports = {
  auth,
  USUARIOS
}