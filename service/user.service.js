const { Users } =  require('../models/database')

module.exports = {
    async setUser(password, email, name) {
        try {
           const user =  await Users.create({ name, password, email})
            return {status: 1, user}
        } catch (e) {
            return  { status: 0, err: e.message}
        }
    },

    async getUser(params) {
        try {
            const user = await Users.findOne({ where: params})

            return {status: 1, user}
        } catch (e) {
            return  { status: 0, err: e.message}
        }
    }
}