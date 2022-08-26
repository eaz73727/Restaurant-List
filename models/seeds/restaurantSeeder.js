const db = require('../../config/mongoose')
const files = require('../../restaurant.json').results
const Restaurant = require('../restaurant')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  // 透過 User 找尋是否有重複的 email 以防止重複建立種子資料 p.s:只刪掉帳號還是會產出餐廳資料
  User.findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('請不要重複執行種子！')
        process.exit()
      }
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash =>
          User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          })
        )
        .then(user => {
          // Promise.all()確保所有非同步行為都完成才進入下一個階段
          return Promise.all(
            // 透過 map 抓取陣列中的每個物件
            files.map(file => {
              // 每個抓取出來的物件加入新的屬性 userId: user.id
              file.userId = user.id
              // 執行每筆資料的創建
              return Restaurant.create(file)
            })
          )
        })
        .then(() => {
          console.log('done')
          process.exit()
        })
    })
    .catch(err => console.log(err))
})
