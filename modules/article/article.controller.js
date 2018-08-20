const mongoose = require('mongoose'),
    Article = mongoose.model('article')

module.exports = {
    async list(ctx) {
        const articles = await Article.find();
        ctx.body = { success: true, data: articles };
    },

    async read(ctx) {
        const article = await Article.findById(ctx.params.id)
        ctx.body = { success: true, data: article };
    },

    async create(ctx) {
        const article = await Article.create(ctx.request.body);
        ctx.body = { success: true, data: article };
    },

    async update(ctx) {
        const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
        ctx.body = { success: true, data: article };
    },

    async delete(ctx) {
        await Article.deleteOne({ _id: ctx.params.id });
        ctx.body = { success: true };
    }
}