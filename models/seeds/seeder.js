const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const files = require('../../restaurant.json').results

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
  Restaurant.create(files)
    .then(()=>console.log('done'))
    .catch(error=>console.log(error))
    .finally(()=>db.close())
})

