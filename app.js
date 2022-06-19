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

app.listen(port, () => {
  console.log(`server is now opening on http://localhost:${port}`)
})