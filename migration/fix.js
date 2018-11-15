const migTool = require('./tool.js')

migTool.initApp()
  .then(() => {
    const mongoose = require('mongoose')
    const Article = mongoose.model('article')

    Article.find()
      .then(articles => Promise.all(articles.map(article => {
        article.tags = []
        return article.save()
      })))
      .then(result => {
        console.log(result)
      })
  })
