const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shorturlSchema = new Schema({
  origin_url: {type: String, required: true},
  short_url: {type: String}
})

//export model
module.exports = mongoose.model('shorturlSchema', shorturlSchema)