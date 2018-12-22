const migTool = require('./tool.js')

migTool.initApp()
  .then(() => {
    const mongoose = require('mongoose')
    const Article = mongoose.model('article')

    Article.find()
      .then(articles => Promise.all(articles.map(article => {
        article.comments = []
        return article.save()
      })))
      .then(result => result.forEach(item => console.log(item.comments)))
      .then(() => process.exit())
  })
