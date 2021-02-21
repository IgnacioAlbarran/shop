'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('secrets');

function createToken(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  jwt.encode(payload, secrets.SECRET_TOKEN);
}

module.exports = createToken;