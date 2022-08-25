const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const restaurants = require('./modules/restaurants')
const { authenticator } = require('../middleware/auth.js')

router.get('/users/logout', userController.logout)
router.use('/restaurants', authenticator, restaurants)
router.post('/users/login', userController.postLogin)
router.get('/users/login', userController.loginPage)
router.post('/users/register', userController.postRegister)
router.get('/users/register', userController.registerPage)
router.use('/', (req, res) => res.redirect('/restaurants/'))

module.exports = router
