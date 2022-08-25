const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant-controller')

router.delete('/restaurants/:id', restaurantController.deleteRestaurant)
router.put('/restaurants/:id', restaurantController.putRestaurant)
router.get('/restaurants/:id/edit', restaurantController.editRestaurantPage)
router.get('/restaurants/:id', restaurantController.detailRestaurantPage)
router.post('/restaurants', restaurantController.postRestaurant)
router.get('/restaurants/new', restaurantController.newRestaurantPage)
router.get('/', restaurantController.getRestaurants)

module.exports = router
