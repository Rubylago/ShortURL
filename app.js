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
  const origin_url = req.body.origin_url
  // console.log(req.body.origin_url)
  // 用函式處理隨機5碼，輸出縮短的url+code
  // 加進伺服器裡
  // 顯示出最新一筆資料在下面
  const code = generate_url(5)
  let short_url = `http://localhost:${port}/`
  short_url += code
  // console.log(short_url)  //http://localhost:3000/lVjuG

  return shorturlSchema.create({origin_url, short_url})
  .then(()=> res.render('index', { short_url }))
  .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`this appp is listen to http://localhost:${port}`)
})