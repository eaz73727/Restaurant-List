const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')

router.post('/users/login', userController.postLogin)
router.get('/users/login', userController.loginPage)
router.post('/users/register', userController.postRegister)
router.get('/users/register', userController.registerPage)
router.delete('/restaurants/:id', restaurantController.deleteRestaurant)
router.put('/restaurants/:id', restaurantController.putRestaurant)
router.get('/restaurants/:id/edit', restaurantController.editRestaurantPage)
router.get('/restaurants/:id', restaurantController.detailRestaurantPage)
router.post('/restaurants', restaurantController.postRestaurant)
router.get('/restaurants/new', restaurantController.newRestaurantPage)
router.get('/', restaurantController.getRestaurants)

module.exports = router
