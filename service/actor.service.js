const { Actors, MoviesActors, Movies } =  require('../models/database')

module.exports = {
    async setActor(name) {
        try {
            const actor = await Actors.create({name})

            return {status: 1, actor}
        } catch (e) {
            return {status: 0, err: e.message}
        }
    },

    async findActor(name) {
        try {
            const actor = await Actors.findOne({ where: {name}})

            return {status: 1, actor}
        } catch (e) {
            return {status: 0, err: e.message}
        }
    },
}