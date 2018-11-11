exports.checkRole = roles => {
  return async function (ctx, next) {
    if (!ctx.req.user) {
      return ctx.throw({ code: 'NO_ACCOUNT', message: 'Please login', resStatus: 401 })
    }

    const accountRole = ctx.state.user.role
    if(accountRole === 'superuser') return next()

    let checkResult
    if(typeof roles === 'string'){
      checkResult = accountRole === roles
            
    }else{
      checkResult = !!roles.find(role => accountRole === role)
    }
         
    if (checkResult) {
      return next()
    } else {
      return ctx.throw({ code: 'INVALId_USER', message: 'Please upgrade', resStatus: 403 })
    }
  }
}