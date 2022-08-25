const Restaurant = require('../models/restaurant')
const restaurantController = {
  getRestaurants: (req, res) => {
    Restaurant.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
  },
  newRestaurantPage: (req, res) => {
    res.render('new')
  },
  postRestaurant: (req, res) => {
    Restaurant.create(req.body)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
  detailRestaurantPage: (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
      .lean()
      .then(restaurant => res.render('detail', { restaurant }))
  }
}

module.exports = restaurantController
