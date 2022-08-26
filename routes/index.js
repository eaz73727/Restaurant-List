const express = require('express')
const router = express.Router()
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth.js')

router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.get('/', (req, res) => res.redirect('/restaurants/'))

module.exports = router
