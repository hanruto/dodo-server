const passportJWT = require('passport-jwt'),
  mongoose = require('mongoose'),
  userModel = mongoose.model('user')

const JwtStrategy = passportJWT.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = function(ctx) {
  var token = null
  if (ctx && ctx.header) {
    token = ctx.header['authorization']
  }
  return token
}
jwtOptions.secretOrKey = 'dodo-xiaoHan'

module.exports = passport => {
  const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
    return userModel
      .findOne({ _id: jwtPayload.id })
      .then(user => {
        if (user) {
          next(null, user)
        } else {
          next(null, false)
        }
      })
      .catch(err => next(err))
  })

  passport.use(strategy)
}
