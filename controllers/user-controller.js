const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  postRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword)
      return console.log('password and confirmPassword is not match')
    User.findOne({ email }).then(user => {
      if (user) {
        console.log('User exist!')
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
    failureRedirect: '/users/login'
  })
}

module.exports = userController
