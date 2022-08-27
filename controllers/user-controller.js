const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  postRegister: (req, res) => {
    let { name, email, password, confirmPassword } = req.body
    const errors = []
    if (name.trim() === '') name = 'Default User'
    if (!email || !password || !confirmPassword)
      errors.push({ message: '除了暱稱以外所有欄位都是必填！' })
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
            }).catch(err => next(err))
          })
          .then(() => {
            req.flash('success_msg', '註冊成功！請登入以繼續使用！')
            res.redirect('/users/login')
          })
          .catch(err => next(err))
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
  }),
  logout: (req, res, next) => {
    req.logout(err => {
      if (err) return next(err)
      req.flash('success_msg', '您已成功登出！')
      res.redirect('/users/login')
    })
  }
}

module.exports = userController
