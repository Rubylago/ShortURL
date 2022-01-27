const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shorturlSchema = new Schema({
  origin_url: {type: String, unique: true, required: true},
  short_url: {type: String, unique: true, required: true}
})

//export model
module.exports = mongoose.model('shorturlSchema', shorturlSchema)