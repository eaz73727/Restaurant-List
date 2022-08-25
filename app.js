if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)
usePassport(app)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is now opening on http://localhost:${PORT}`)
})
