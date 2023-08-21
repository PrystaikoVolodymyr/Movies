const { Actors, Movies, MoviesActors } =  require('../models/database')

module.exports = {
    async setFilm(title, releaseYear, format, actorsId) {
        try {
            const movie = await Movies.create({ title, format, releaseYear})

            await movie.addActors(actorsId)

            return {status: 1, movie}
        } catch (e) {
            return {status: 0, err: e.message}
        }
    },

    async deleteFilmById(id) {
        try {

            const deleted = await Movies.destroy({
                where: {
                    id: id
                }
            });

            //TODO
            //add deleting from associated table "MoviesActors"

            if (deleted < 0) {
                return {status: 0, err: "no deleted"}
            }
            return {status: 1, deleted}
        } catch (e) {
            return { status: 0, err: e.message}
        }
    },

    async updateFilmById(id, updateObject) {
        try {
            const [updatedCount] = await Movies.update(
                updateObject,
                { where: {
                    id: id
                    }}
            );
            if (updatedCount === 0) {
                return {status: 0, err: "no updated"}
            }
            return {status: 1, updatedCount}
        } catch (e) {
            return { status: 0, err: e.message}
        }
    },

    async getFilmById(id) {
        try {
            const movie = await Movies.findByPk(
                id,
                {
                include: {
                    model: Actors,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });
            if (!movie) {
                return {status: 0, err: "no film"}
            }
            return {status: 1, movie}
        } catch (e) {
            return { status: 0, err: e.message}
        }
    },

    async getListWithFilter(filterOptions) {
        try {
            let include = []
            let where = {}
            let order = []

            if (filterOptions.hasOwnProperty("sort")) {
                if (filterOptions.hasOwnProperty('order')) {
                    order = [[filterOptions.sort, filterOptions.order]]
                } else {
                    order = [[filterOptions.sort, 'ASC']]
                }
            } else if (filterOptions.hasOwnProperty('order')){
                order = [['id', filterOptions.order]]
            }

            if (filterOptions.hasOwnProperty("title")) {
                where.title = filterOptions.title
            }
            if (filterOptions.hasOwnProperty("releaseYear")) {
                where.releaseYear = filterOptions.releaseYear
            }
            if (filterOptions.hasOwnProperty("actor")) {
               include.push({
                    model: Actors,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                    where: {
                        name: filterOptions.actor
                    }
                })
            } else {
                include.push({
                    model: Actors,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                })
            }

            const movies = await Movies.findAll( {
                where: where,
                include: include,
                order: order,
                limit: filterOptions?.limit || 20,
                offset: filterOptions?.offset || 0
            });

            return {status: 1, movies}
        } catch (e) {
            console.log(e.message)
            return { status: 0, err: e.message}
        }
    },
}