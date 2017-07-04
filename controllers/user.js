'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.findOne( { email: req.body.email }, (err, user) => {

    if (err) throw err

    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch) return res.status(401).send( { message: 'Las credenciales no coinciden' } )

      req.user = user
      return res.status(200).send( { message: 'Te has logueado correctamente', token: service.createToken(user), user } )
    })

  })
}

module.exports = {
  signUp,
  signIn
}
