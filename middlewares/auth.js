'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token, config.SECRET_TOKEN)

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'El Token ha expirado' })
  }

  req.user = payload.sub
  next()
}

module.exports = isAuth
