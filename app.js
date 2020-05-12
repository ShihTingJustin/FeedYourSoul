// require packages used in the project
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const rList = require('./restaurant.json')
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongidb error!'))
db.once('open', () => console.log('mongodb connected!'))

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: rList.results })
})

app.get('/restaurants/:r_id', (req, res) => {
  const restaurant = rList.results.find(r => r.id.toString() === req.params.r_id)

  // console.log(req.route.path)
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurant = rList.results.filter(r => {
    return r.name.toLowerCase().includes(keyword)
  })
  //使用者輸入與餐廳名稱都轉成小寫 再用includes比對
  // console.log(restaurant)
  if (restaurant.length > 0) {
    res.render('index', { restaurants: restaurant, keyword: req.query.keyword })

  } else {
    res.render('nothing', { keyword })
  }
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

