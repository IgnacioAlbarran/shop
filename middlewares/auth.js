'user strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../secrets')
const jwt_decode = require('jwt-decode')

function isAuth(req, res, next){
  if (!req.headers.authorization){
    return res.status(403).send({message: 'Not authorised'})
  }

  const token = req.headers.authorization;
  console.log(token)
  console.log(secret.SECRET_TOKEN)
  const payload = jwt_decode(token, secret.SECRET_TOKEN)
  console.log(payload)
  console.log(payload)

  if (payload.exp <= moment().unix()){
    res.status(401).send({ message: 'Token expired' })
  }

  req.user = payload.sub
  req.level = payload.lev
  next()
}

module.exports = {
  isAuth
}