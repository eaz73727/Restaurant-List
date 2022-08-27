const Restaurant = require('../models/restaurant')
const restaurantController = {
  getRestaurants: (req, res, next) => {
    const userId = req.user._id
    Restaurant.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(restaurants => res.render('index', { restaurants }))
      .catch(err => next(err))
  },
  newRestaurantPage: (req, res) => {
    res.render('new')
  },
  postRestaurant: (req, res, next) => {
    const userId = req.user._id
    const { name, category, image, location, phone, google_map, rating, description } = req.body
    // 防止有人修改我在 html skeleton 上面的 required
    if (!name || !category || !image || !location || !phone || !google_map || !rating || !description) throw new Error('所有欄位都是必填')
    Restaurant.create({ ...req.body, userId })
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  },
  detailRestaurantPage: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('detail', { restaurant }))
  },
  editRestaurantPage: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('edit', { restaurant }))
      .catch(err => next(err))
  },
  putRestaurant: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { name, category, image, location, phone, google_map, rating, description } = req.body
    // 防止有人修改我在 html skeleton 上面的 required
    if (!name || !category || !image || !location || !phone || !google_map || !rating || !description
    ) throw new Error('所有欄位都是必填')
    Restaurant.findOneAndUpdate({ _id, userId }, req.body)
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(err => next(err))
  },
  deleteRestaurant: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOneAndRemove({ _id, userId })
      .then(() => res.redirect('/'))
      .catch(err => next(err))
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
