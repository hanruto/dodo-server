const koa = require('./koa'),
    mongoose = require('./mongoose');

exports.start = async () => {
    await mongoose.connect();
    mongoose.loadModels();
    const app = koa.init();
    app.listen(8081);
    console.log('App is running in 8081');
}
