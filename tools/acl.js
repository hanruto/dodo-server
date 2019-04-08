const passport = require('koa-passport')

exports.checkRoles = roles => {
  return async function(ctx, next) {
    if (typeof roles === 'string') {
      roles = [roles]
    }

    // 超级管理员没有权限限制

    if (roles.includes('user')) {
      return passport.authenticate('jwt', { session: false })(ctx, next)
    }

    if (roles.includes('admin') || roles.includes('superuser')) {
      if (!ctx.state.user) {
        return ctx.throw({ code: 'NO_ACCOUNT', message: 'Please login', resStatus: 401 })
      }

      const accountRole = ctx.state.user.role

      if (accountRole === 'superuser') return next()

      const checkResult = roles.includes(accountRole)

      if (checkResult) {
        return next()
      } else {
        return ctx.throw({ code: 'INVALId_USER', message: 'Please upgrade', resStatus: 403 })
      }
    }
  }
}
