const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true
      },
      (req, email, password, cb) => {
        User.findOne({ email })
          .then(user => {
            if (!user)
              return cb(
                null,
                false,
                req.flash('warning_msg', '帳號或密碼不符！')
              )
            return bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch)
                return cb(
                  null,
                  false,
                  req.flash('warning_msg', '帳號或密碼不符！')
                )
              return cb(null, user)
            })
          })
          .catch(err => console.log(err))
      }
    )
  )

  // 序列化
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })
  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .lean()
      .then(user => cb(null, user))
      .catch(err => cb(err))
  })
}
