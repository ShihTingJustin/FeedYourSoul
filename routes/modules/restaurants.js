const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


//CREATE 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  return Restaurant.create({ name, category })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//READ 瀏覽單一餐廳資訊
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//UPDATE 編輯餐廳資訊
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

router.put('/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()  // save 是 mongoose 提供的方法
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//DELETE 刪除餐廳
router.delete('/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//READ 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  return Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword: req.query.keyword }))
})

module.exports = router