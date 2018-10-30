const mongoose = require('mongoose'),
    Article = mongoose.model('article')

module.exports = {
    async list(ctx) {
        const { perPage = 15, page = 1 } = ctx.query
        const getData = Article.find()
            .sort('-created')
            .skip((page - 1) * perPage)
            .limit(Number(perPage))
            .populate('author')

        const getCount = Article.count()
        const [list, count] = await Promise.all([getData, getCount])
        ctx.body = { success: true, data: { list, perPage, page, count }, }
    },

    async read(ctx) {
        const article = await Article.findById(ctx.params.id)
        ctx.body = { success: true, data: article }
    },

    async create(ctx) {
        const articleInfo = Object.assign(ctx.request.body, {
            author: ctx.state.user._id
        })
        const article = await Article.create(articleInfo)
        ctx.body = { success: true, data: article, message: '保存成功' }
    },

    async update(ctx) {
        const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true })
        ctx.body = { success: true, data: article }
    },

    async delete(ctx) {
        await Article.deleteOne({ _id: ctx.params.id })
        ctx.body = { success: true }
    },

    async comment(ctx) {
        const comment = ctx.request.body

        const article = await Article.findById({ _id: ctx.params.id })

        article.comments.push(comment)
        const updatedArticle = await article.save()
            .catch(err => { throw new Error(err) })

        ctx.body = { success: true, data: updatedArticle }
    },

    async deleteComment(ctx) {
        const {id, commentId} = ctx.params
        const article = await Article.findById({ _id: id })
        article.comments = article.comments.filter(comment => comment._id.toString() !== commentId)

        const updatedArticle = await article.save()

        ctx.body = { success: true, data: updatedArticle }
    },

    async getTags(ctx) {
        let tags = new Set()
        const articles = await Article.find().select('tags')
        articles.forEach(article => {
            article.tags.forEach(tag => tags.add(tag))
        })
        ctx.body = { success: true, data: Array.from(tags) }
    }
}