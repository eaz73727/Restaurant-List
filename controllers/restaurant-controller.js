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
  },
  editRestaurantPage: (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
      .lean()
      .then(restaurant => res.render('edit', { restaurant }))
      .catch(err => console.log(err))
  },
  putRestaurant: (req, res) => {
    const id = req.params.id
    Restaurant.findByIdAndUpdate(id, req.body)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
  deleteRestaurant: (req, res) => {
    const id = req.params.id
    Restaurant.findByIdAndRemove(id)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
  searchRestaurants: (req, res) => {
    const keyword = req.query.keyword.toLowerCase().trim()
    Restaurant.find()
      .lean()
      .then(restaurant => {
        const filteredRestaurant = restaurant.filter(restaurant => {
          const { name, name_en, category } = restaurant
          return (
            name.toLowerCase().includes(keyword) ||
            name_en.toLowerCase().includes(keyword) ||
            category.toLowerCase().includes(keyword)
          )
        })
        return filteredRestaurant
      })
      .then(restaurants => {
        const noFile = !restaurants.length
        res.render('index', { keyword, noFile, restaurants })
      })
  }
}

module.exports = restaurantController
