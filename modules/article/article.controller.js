module.exports = {
    async list(cxt) {
        cxt.body = { success: true, data: [] }
    },

    async read() {
        cxt.body = { success: true, data: [] }
    },

    async create() {
        cxt.body = { success: true, data: [] }
    },

    async update() {
        cxt.body = { success: true, data: [] }
    },

    async delete() {
        cxt.body = { success: true }
    }
}