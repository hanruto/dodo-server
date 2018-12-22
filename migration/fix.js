const migTool = require('./tool.js')

migTool.initApp()
  .then(() => {
    const mongoose = require('mongoose')
    const LeavedMessage = mongoose.model('leaved-message')

    LeavedMessage.find()
      .then(messages => Promise.all(messages.map(message => {
        message.type = 0
        return message.save()
      })))
      .then(result => console.log(result))
  })
