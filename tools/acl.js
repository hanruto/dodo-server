const passport = require('koa-passport')

exports.checkRoles = roles => {
  return async function(ctx, next) {
    if (typeof roles === 'string') {
      roles = [roles]
    }

    if (roles.includes('user')) {
      return passport.authenticate('jwt', { session: false })(ctx, next)
    }

    if (roles.inlcudes('admin', 'superuser')) {
      if (!ctx.state.user) {
        return ctx.throw({ code: 'NO_ACCOUNT', message: 'Please login', resStatus: 401 })
      }

      const accountRole = ctx.state.user.role

      if (accountRole === 'superuser') return next()

      const checkResult = !!roles.find(role => accountRole === role)

      if (checkResult) {
        return next()
      } else {
        return ctx.throw({ code: 'INVALId_USER', message: 'Please upgrade', resStatus: 403 })
      }
    }
  }
}
