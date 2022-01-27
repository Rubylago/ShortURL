const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const shorturlSchema = require('./models/shorturl')
const generate_url = require('./generate_url')
const { redirect } = require('express/lib/response')
// const { redirect } = require('express/lib/response') 又發現系統自動新增的一行，找不到原因，到底!!!
const routes = require('./routes')
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
app.use(routes)

// app.get('/', (req, res) => {
//   res.render('index')
// })

// app.get('/urls/:shorturl', (req, res) => {
//   const code = req.params.shorturl
//   console.log(code)
//   return shorturlSchema.findOne({short_url: {$regex: code}},{origin_url:1, _id:0})
//   .then(item => res.redirect(item.origin_url))
//   .catch(error => console.log(error))
// })

// app.post('/urls', (req, res) => {
//   const url = req.body.origin_url.trim()
//   const code = generate_url(5)
//   let short_url = `http://localhost:${port}/urls/`
//   short_url += code
//   // 確認使用者輸入內容不為空
//   // 若為空 不動作 用{{#if}}跳提醒
//   if (url.length === 0){
//     const warning ="請填入內容"
//     return res.render('index', { warning })
//   }

//  shorturlSchema.count({origin_url: url})
//   .lean()
//   .then(data => {
//       if(data > 0){
//         // console.log('>0',data) 
//         return shorturlSchema.findOne({origin_url: url},{short_url:1, _id:0}).then((short_url)=> res.render('index', { short_url: short_url.short_url })).catch(error => console.log(error))
//       } else {
//         // console.log('=0',data)
//         return shorturlSchema.create({origin_url: url, short_url})
//           .then(()=> res.render('index', { short_url }))
//           .catch(error => console.log(error))
//       }
//     })
// })

app.listen(port, () => {
  console.log(`this appp is listen to http://localhost:${port}`)
})