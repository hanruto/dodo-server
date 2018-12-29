const mongoose = require('mongoose'),
  path = require('path'),
  glob = require('glob')

exports.connect = async () => {
  const uri = 'mongodb://127.0.0.1:27017/service'
  await mongoose.connect(uri, { useNewUrlParser: true })
    .catch(err => console.error(err))
  console.log('connect mongo in:' + uri)
}

exports.loadModels = () => {
  const filesPattern = path.resolve('./modules/*/*.model.js')
  const files = glob.sync(filesPattern)
  files.forEach(file => require(file))
  console.log('all model have been load')
}
