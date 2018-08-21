const mongoose = require('mongoose'),
    Admin = mongoose.model('admin');

module.exports = {
    async login(ctx, next) {
        const { email, password } = ctx.request.body;
        if (!email || !password) {
            return
        }
        passport.authenticate('local', (err, admin) => {
            if (err) return ctx.throw(err)
            req.logIn(admin, (err) => {
                if (err) {
                    return next(err);
                }
                admin.password = admin.salt = null;
                return res.send({ code: 400000, data: admin });
            })
        })(ctx.req, ctx.res, next)
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