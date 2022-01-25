const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const shorturlSchema = require('./models/shorturl')
const generate_url = require('./generate_url')
const { redirect } = require('express/lib/response')
// const { redirect } = require('express/lib/response') 又發現系統自動新增的一行，找不到原因，到底!!!
const port = 3000

mongoose.connect('mongodb://localhost/shorturl-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:shorturl', (req, res) => {
  const code = req.params.shorturl
  return shorturlSchema.findOne({short_url: {$regex: code}},{origin_url:1, _id:0})
  // 撈出原始連結 重新導向
  .then(item => res.redirect(item.origin_url))
  .catch(error => console.log(error))
})

app.post('/urls', (req, res) => {
  const url = req.body.origin_url
  const code = generate_url(5)
  let short_url = `http://localhost:${port}/`
  short_url += code

  // 用.count() 確認資料庫裡有沒有這筆原始連結 
  // 有的話直接回傳已經縮過的shorturl
  // 沒有的話creat新的

 shorturlSchema.count({origin_url: url})
  .lean()
  .then(data => {
      if(data > 0){
        // console.log('>0',data) 
        return shorturlSchema.findOne({origin_url: url},{short_url:1, _id:0}).then((short_url)=> res.render('index', { short_url: short_url.short_url })).catch(error => console.log(error))
      } else {
        // console.log('=0',data)
        return shorturlSchema.create({origin_url: url, short_url})
          .then(()=> res.render('index', { short_url }))
          .catch(error => console.log(error))
      }
    })
})

app.listen(port, () => {
  console.log(`this appp is listen to http://localhost:${port}`)
})