const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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
            if (!user) {
              return cb(
                null,
                false,
                req.flash('warning_msg', '帳號或密碼不符！')
              )
            }
            return bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
                return cb(null, false, req.flash('warning_msg', '帳號或密碼不符！')
                )
              }
              return cb(null, user)
            })
          })
          .catch(err => console.log(err))
      }
    )
  )
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, cb) => {
        const { name, email } = profile._json
        User.findOne({ email }).then(user => {
          if (user) return cb(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash =>
              User.create({
                name,
                email,
                password: hash
              })
            )
            .then(user => cb(null, user))
            .catch(err => cb(err, false))
        })
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
