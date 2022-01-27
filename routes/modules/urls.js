const express = require('express')
const router = express.Router()
const shorturlSchema = require('../../models/shorturl')
const generate_url = require('../../generate_url')
const port = 3000

router.get('/:shorturl', (req, res) => {
  const code = req.params.shorturl
  return shorturlSchema.findOne({short_url: {$regex: code}})
  .then(item => res.redirect(item.origin_url))
  .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const url = req.body.origin_url.trim()
  const code = generate_url(5)
  let short_url = `http://localhost:${port}/urls/${code}`
  // 確認使用者輸入內容不為空
  // 若為空 不動作 用{{#if}}跳提醒
  if (url.length === 0){
    const warning ="請填入內容"
    return res.render('index', { warning })
  }

 shorturlSchema.count({origin_url: url})
  .lean()
  .then(data => {
      if(data > 0){
        // console.log('>0',data) 
        return shorturlSchema.findOne({origin_url: url}).then((short_url)=> res.render('index', { short_url: short_url.short_url })).catch(error => console.log(error))
      } else {
        // console.log('=0',data)
        return shorturlSchema.create({origin_url: url, short_url})
          .then(()=> res.render('index', { short_url }))
          .catch(err => {console.error(err)  
            res.render('errorPage',{ error: error.message })})
      }
    })
})

module.exports = router