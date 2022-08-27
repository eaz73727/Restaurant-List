const db = require('../../config/mongoose')
const files = require('../../restaurant.json').results
const seedUsers = require('../../users.json').results
const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')
const restaurant = require('../restaurant')
db.once('open', () => {
  Promise.all(
    Array.from(seedUsers, user => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash =>
          User.create({
            name: user.name,
            email: user.email,
            password: hash
          }))
        .then(user => {
          const restaurants = user.name === 'user1' ? files.slice(0, 3) : files.slice(3, 6)
          restaurants.map(restaurant => {
            restaurant.userId = user._id
            return restaurant
          })
          return Restaurant.create(restaurants)
        })
    })
  )
  .then(() => {
    console.log('done')
    process.exit()
  })
})
