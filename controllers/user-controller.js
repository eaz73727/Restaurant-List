const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  postRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword)
      errors.push({ message: '所有欄位都是必填！' })
    if (password !== confirmPassword)
      errors.push({ message: '密碼與確認密碼不符！' })
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email
      })
    }
    User.findOne({ email }).then(user => {
      if (user) {
        req.flash('warning_msg', '使用者已存在')
        res.render('register', { name, email })
      } else {
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => {
            User.create({
              name,
              email,
              password: hash
            }).catch(err => console.log(err))
          })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
  },
  loginPage: (req, res) => {
    res.render('login')
  },
  postLogin: passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true,
    failureRedirect: '/users/login'
  })
}

module.exports = userController
