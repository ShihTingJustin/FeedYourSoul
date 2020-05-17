const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//READ 搜尋餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ $or: [ { name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword: req.query.keyword }))
})

module.exports = router