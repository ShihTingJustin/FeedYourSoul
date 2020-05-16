const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//READ 搜尋餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword: req.query.keyword }))
})

module.exports = router