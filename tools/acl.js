exports.checkRole = (roles) => {
    return async function (ctx, next) {
        if (!ctx.req.user) {
            return ctx.throw({ code: 'NO_ACCOUNT', message: 'Please login', resStatus: 401 });
        }

        const { accountRole } = ctx.req.user;
        const checkResult = roles.some(role => accountRole === role);
        if (checkResult) {
            return next();
        } else {
            return next({ code: 'INVALId_USER', message: 'Please upgrade', resStatus: 403 });
        }
    }
}