// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')
const routes = require('./routes')

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //API設定時帶上_method就會轉換為HTTP方法
app.use(routes)


// setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})