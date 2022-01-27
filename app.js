const express = require('express')
const app = express()
require('./config/mongoose.js')
const exphbs = require('express-handlebars')

const { redirect } = require('express/lib/response')
// const { redirect } = require('express/lib/response') 又發現系統自動新增的一行，找不到原因，到底!!!

const routes = require('./routes')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`this appp is listen to http://localhost:${port}`)
})