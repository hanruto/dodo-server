const mongoose = require('mongoose'),
    passport = require('koa-passport'),
    Admin = mongoose.model('admin');

module.exports = {
    async login(ctx) {
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            return ctx.throw({ code: 'AUTHINFO_ERR', message: '用户名或密码错误' })
        }

        return passport.authenticate('local', (err, admin) => {
            if (admin) {
                admin.password = admin.salt = null;
                return ctx.body = { success: true, data: admin };
                // return ctx.login(admin)
            }
        })(ctx)
    },

    async signout(cxt) {
        cxt.req.logOut();
        cxt.res.redirect('/');
    },

    async list(ctx) {
        const admins = await Admin.find();
        ctx.body = { success: true, data: admins };
    },

    async create(ctx) {
        const admin = await Admin.create(ctx.request.body);
        ctx.body = { success: true, data: admin };
    },

    async update(ctx) {
        const admin = await Admin.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
        ctx.body = { success: true, data: admin };
    },

    async delete(ctx) {
        await Admin.deleteOne({ _id: ctx.params.id });
        ctx.body = { success: true };
    }
}