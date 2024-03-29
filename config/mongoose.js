if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB)

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})

module.exports = db
