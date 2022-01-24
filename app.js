const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = 3000

mongoose.connect('mongodb://localhost/shorturl-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})




app.get('/', (req, res) => {
  res.send('hi')
})


app.listen(port, () => {
  console.log(`this appp is listen to http://localhost:${port}`)
})