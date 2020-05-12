const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const rList = require('./restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => {
  console.log('mongodb connected!')
  rList.results.forEach(r => {
    Restaurant.create({
      "name": r.name,
      "name_en": r.name_en,
      "category": r.category,
      "image": r.image,
      "location": r.location,
      "phone": r.phone,
      "google_map": r.google_map,
      "rating": r.rating,
      "description": r.description
    })
  })
  console.log('done.')
})
