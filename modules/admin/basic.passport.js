const mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    { app } = require('../../config/koa'),
    Admin = mongoose.model('admin');

passport.serializeUser((admin, done) => {
    done(null, admin._id);
});

passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    if (!username || !password) {
        return done({ success: false, code: 101001 });
    }

    Admin.findOne({ email: username.toLowerCase() })
        .then(admin => {
            if (!admin) {
                return done(101001);
            }
            if (admin.status === -1) {
                return done(101002);
            }
            if (!admin.validatePassword(password)) {
                return done(101003);
            }
            return done(null, admin);
        })
        .catch(err => done(err));
}));

app.use(passport.initialize());
app.use(passport.session());