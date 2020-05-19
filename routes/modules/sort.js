const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:sorting/:name', (req, res) => {
  const { sorting, name } = req.params
  Restaurant.find()
    .lean()
    .sort({ [sorting]: name })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
  console.log(req.params)
})

//DELETE 刪除餐廳
router.delete('/name/restaurants/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/rating/restaurants/:id/', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router