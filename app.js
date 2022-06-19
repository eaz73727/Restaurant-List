const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json').results

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const filteredRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  const noFile = filteredRestaurants.length ? false : true
  res.render('index', { restaurants:filteredRestaurants , keyword, noFile })
})

app.listen(port, () => {
  console.log(`server is now opening on http://localhost:${port}`)
})