const passport = require('koa-passport')
const whitelistController = require('../modules/whitelist/whitelist.controller')

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

exports.checkIpIsInWhiteList = (ctx, next) => {
  const ip = ctx.request.headers['x-forward-for']
    || ctx.headers['x-real-ip']
    || ctx.socket.remoteAddress

  if (whitelistController.get('ip').includes(ip)) {
    return ctx.body = { success: true, message: 'ip在白名单中，不予统计' }
  }

  return next()
}