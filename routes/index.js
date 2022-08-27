const express = require('express')
const router = express.Router()
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth.js')
const errorHelper = require('../middleware/error-helper')
const { generalErrorHandler } = require('../middleware/error-helper')

router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.get('/', (req, res) => res.redirect('/restaurants/'))
router.use(generalErrorHandler)

module.exports = router
