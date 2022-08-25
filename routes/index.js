const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

router.get('/restaurants/:id', restaurantController.detailRestaurantPage)
router.post('/restaurants', restaurantController.postRestaurant)
router.get('/restaurants/new', restaurantController.newRestaurantPage)
router.get('/', restaurantController.getRestaurants)

module.exports = router
