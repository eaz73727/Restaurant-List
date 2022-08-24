const db = require('../../config/mongoose')
const files = require('../../restaurant.json').results
const Restaurant = require('../restaurant')

db.once('open', () => {
  Restaurant.create(files)
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})
