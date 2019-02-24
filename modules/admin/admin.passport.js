const mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  Admin = mongoose.model('admin')

module.exports = passport => {
  passport.serializeUser((admin, done) => {
    done(null, admin._id)
  })

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
      done(err, user)
    })
  })

  const strategy = new LocalStrategy((username, password, done) => {
    return Admin.findOne({ username: username.trim() })
      .then(admin => {
        if (!admin) {
          return done({ code: 'AUTHINFO_ERR', message: '用户名或密码错误', resStatus: 200 })
        }
        if (admin.status === -1) {
          return done({ code: 'AUTHINFO_ERR', message: '用户名已被冻结', resStatus: 200 })
        }
        if (!admin.validatePassword(password)) {
          return done({ code: 'AUTHINFO_ERR', message: '用户名或密码错误', resStatus: 200 })
        }
        return done(null, admin)
      })
      .catch(err => done(err))
  })

  passport.use(strategy)
}
