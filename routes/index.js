const express = require('express')
const router = express.Router()
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth.js')

router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.get('/', (req, res) => res.redirect('/restaurants/'))

module.exports = router
