// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const rList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

// setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find() //取出 model 裡所有資料
    .lean()  // mongoose model 物件轉換成 JS array
    .then(restaurants => res.render('index', { restaurants })) //資料傳給 index 樣板
    .catch(error => console.error(error)) //錯誤處理
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  return Restaurant.create({ name, category })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))  
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