const Restaurant = require('../models/restaurant')
const restaurantController = {
  getRestaurants: (req, res) => {
    Restaurant.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
  }
}

module.exports = restaurantController
