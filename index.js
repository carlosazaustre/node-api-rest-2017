'use strict'

const express = require('express')

const app = express()

app.listen(3000, () => {
  console.log(`API REST corriendo en http://localhost:3000`)
})
