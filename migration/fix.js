const migTool = require('./tool.js')

migTool.initApp()
  .then(() => {
    const mongoose = require('mongoose')
    const Article = mongoose.model('article')

    Article.find()
      .then(articles => Promise.all(articles.map(article => {
        article.comments = null
        return article.save()
      })))
      .then(result => console.log(result))
      .then(() => process.exit())
      .catch(() => process.exit())
  })
