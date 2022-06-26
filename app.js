const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected')
})

app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find().lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).lean()
    .then(restaurant => res.render('show', { restaurant }))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const re = new RegExp(keyword, 'i')
  Restaurant.find({ $or: [{ name: { $regex: re } }, { category: { $regex: re } }, { name_en: { $regex: re } }] })
    .lean()
    .then(restaurants => {
      const noFile = !restaurants.length
      res.render('index', { keyword, noFile, restaurants })
    })
})

app.listen(port, () => {
  console.log(`server is now opening on http://localhost:${port}`)
})