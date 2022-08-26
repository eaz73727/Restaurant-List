const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/restaurant-controller')

router.get('/search', restaurantController.searchRestaurants)
router.get('/new', restaurantController.newRestaurantPage)
router.delete('/:id', restaurantController.deleteRestaurant)
router.put('/:id', restaurantController.putRestaurant)
router.get('/:id/edit', restaurantController.editRestaurantPage)
router.get('/:id', restaurantController.detailRestaurantPage)
router.post('/', restaurantController.postRestaurant)
router.get('/', restaurantController.getRestaurants)

module.exports = router
