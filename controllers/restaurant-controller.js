const Restaurant = require('../models/restaurant')
const restaurantController = {
  getRestaurants: (req, res) => {
    const userId = req.user._id
    Restaurant.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(err => console.log(err))
  },
  newRestaurantPage: (req, res) => {
    res.render('new')
  },
  postRestaurant: (req, res) => {
    const userId = req.user._id
    Restaurant.create({ ...req.body, userId })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  },
  detailRestaurantPage: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('detail', { restaurant }))
  },
  editRestaurantPage: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('edit', { restaurant }))
      .catch(err => console.log(err))
  },
  putRestaurant: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOneAndUpdate({ _id, userId }, req.body)
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(err => console.log(err))
  },
  deleteRestaurant: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOneAndRemove({ _id, userId })
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
