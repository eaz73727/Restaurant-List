const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find().lean()
    .sort({_id:'asc'}) // 升序
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const re = new RegExp(keyword, 'i')
  Restaurant.find({
    $or: [
      { name: { $regex: re } },
      { category: { $regex: re } },
      { name_en: { $regex: re } }]
  })
    .lean()
    .then(restaurants => {
      const noFile = !restaurants.length
      res.render('index', { keyword, noFile, restaurants })
    })
})

module.exports = router