const userService = require('../service/user.service')
const { hash } = require('../helpers/password.helper')
const {generateToken} = require("../helpers/session.helper");

module.exports = {
    async createUser(ctx) {
        try {
            const { password, name, email, confirmPassword } = ctx.body;

            if (await password !== confirmPassword) {
                throw new Error("Passwords don't match")
            }
            const hashPassword = await hash(password)

            const { user, status, err} = await userService.setUser(hashPassword, email, name)

            if (status !== 1) {
                throw new Error(err)
            }

            const token = await generateToken(
                {
                    email: user.email,
                    id: user.id
                })

            return { status : "success", token: token}
        } catch (e) {
            return { status: "error", err: e.message}
        }
    }
}