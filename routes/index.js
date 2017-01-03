'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const productCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/user', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth.isAuth, function (req, res) {
  res.status(200).send({ message: 'tienes acceso' })
})

module.exports = api
