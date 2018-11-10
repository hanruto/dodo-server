const { init, app } = require('./koa'),
  mongoose = require('./mongoose')

exports.start = async () => {
  await mongoose.connect()
  mongoose.loadModels()
  try {
    init()
  } catch (err) {
    console.error(err)
  }

  app.listen(8000)
  console.log('App is running in 8000')
}
