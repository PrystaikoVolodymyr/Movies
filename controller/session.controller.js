const { compare } = require('../helpers/password.helper')
const userService = require('../service/user.service')
const { generateToken } = require('../helpers/session.helper')

module.exports = {
    async openSession(ctx) {
        try {
            const { password, email } = ctx.body;

            const { user, status, err } = await userService.getUser({email: email})

            if (status !==1) {
                return new Error(err)
            }

            if (!user) {
                return new Error("Wrong email or password")
            }
            await compare(password, user.password)

            const token = await generateToken(
                {
                    email: user.email,
                    id: user.id
                })

            return { status : "success", token: token}
        } catch (e) {
            return { status : "error", err: e.message}
        }
    },
}