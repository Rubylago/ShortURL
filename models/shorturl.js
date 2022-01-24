const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shorturlSchema = new Schema({
  originUrl: {type: String, required: true},
  shortUrl: type: String
})

//export model
module.exports = mongoose.model('shorturlSchema', shorturlSchema)