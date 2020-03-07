const mongoose = require('mongoose')
const RobotChatModel = mongoose.model('robot-chat')

module.exports = {
  async getChats(ctx) {
    const { page, perPage, ...query } = ctx.query
    const skip = (page - 1) * perPage
    const limit = Number(perPage)
    const list = await RobotChatModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort('-created')
      .select('-content')
      
    const total = await RobotChatModel.count(query)

    ctx.body = { success: true, data: { list, total } }
  },

  async getChatByKey(ctx) {
    const key = ctx.params.key
    const data = await RobotChatModel.findOne({ key })
    
    ctx.body = { data, success: true}
  },

  async getChatById(ctx) {
    const id = ctx.params.id
    const data = await RobotChatModel.findById(id)
    
    ctx.body = { data, success: true}
  },


  async createChat(ctx) {
    const data = ctx.request.body
    const chat = new RobotChatModel(data)

    await chat.save()
    ctx.body = { success: true }
  },

  async deleteChat(ctx) {
    const { id } = ctx.params
    await RobotChatModel.findByIdAndRemove(id)
    
    ctx.body = { success: true }
  },

  async updateChat(ctx) {
    const id = ctx.params.id
    const { ...info } = ctx.request.body
    await RobotChatModel.findByIdAndUpdate(id, info)

    console.log('find and update')
    ctx.body = { success: true }
  },

  async drop(ctx){
    await mongoose.connection.collections['robot-chats'].drop()
    ctx.body = { success: true }
  },

  async addViewCount(ctx) {
    const { id } = ctx.params
    const chat = await RobotChatModel.findById(id)

    chat.viewCount++
    await chat.save()
    ctx.body = { success: true, data: chat }
  }
}
