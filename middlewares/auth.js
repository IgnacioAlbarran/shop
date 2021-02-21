'user strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../secrets')

function isAuth(req, res, next){
  if (!req.headers.authorization){
    return res.status(403).send({message: 'Not authorised'})
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.decode(token, secret.SECRET_TOKEN)

  if (payload.exp <= moment().unix()){
    res.status(401).send({ message: 'Token expired' })
  }

  req.user = payload.sub
  next()
}

module.exports = isAuth