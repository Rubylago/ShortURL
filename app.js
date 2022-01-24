const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// const { redirect } = require('express/lib/response') // 又發現系統自動新增的一行
const shorturlSchema = require('./models/shorturl')

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

app.post('/urls', (req, res) => {
  const origin_url = req.body.origin_url
  console.log(req.body.origin_url)
  // 用函式處理壓縮，輸出縮短的url
  // 加進伺服器裡
  // 顯示出最新一筆資料在下面

  return shorturlSchema.create({origin_url})
  .then(()=> res.render('index', { origin_url }))
  .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`this appp is listen to http://localhost:${port}`)
})