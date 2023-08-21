const moviesService = require('../service/movie.service')
const actorService = require('../service/actor.service')
const { parseFromFile } = require('../helpers/movie.helper')

module.exports = {
    async addFilm(ctx) {
        try {
            const { title, releaseYear, format, actors } = ctx.body;

            const actorsId = await Promise.all(actors.map(async actor => {
                let exist = await actorService.findActor(actor)
                if (exist.actor) {
                    return exist.actor
                }
               let  {status, actor: newActor, err} = await actorService.setActor(actor)
                if (status !== 1) {
                    throw new Error(err)
                }
                return newActor;
            }));

            let { movie, status, err } = await moviesService.setFilm( title, releaseYear, format, actorsId)

            if (status !== 1) {
                throw new Error(err)
            }
            return { status : "success", movie: movie}
        } catch (e) {
            return { status : "error", err: e.message}
        }
    },

    async deleteFilm(ctx) {
        try {
            const { id } = ctx.params;

            const { status, err } = await moviesService.deleteFilmById(id)

            if (status !== 1) {
                throw new Error(err)
            }

            return { status : "success"}
        } catch (e) {
            return { status : "error", err: e.message}
        }
    },

    async updateFilm(ctx) {
        try {
            const { id } = ctx.params;

            let actorsId
            if (ctx.body.hasOwnProperty('actors')) {
                 actorsId = await Promise.all(ctx.body.actors.map(async actor => {
                     let exist = await actorService.findActor(actor)
                     if (exist.actor) {
                         return exist.actor
                     }
                     let  {status, actor: newActor, err} = await actorService.setActor(actor)
                     if (status !== 1) {
                         throw new Error(err)
                     }
                     return newActor;
                }));
            }

            const { status, err } = await moviesService.updateFilmById(id, {...ctx.body, actors: actorsId})

            if (status !== 1) {
                throw new Error(err)
            }

            return { status : "success"}
        } catch (e) {
            return { status : "error", err: e.message}
        }
    },

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const { movie, status, err } = await moviesService.getFilmById(id)

            if (status !== 1) {
                throw new Error(err)
            }
            return { status : "success", movie}
        } catch (e) {
            return { status : "error", err: e.message}
        }
    },


    async filmFilter(ctx) {
        try {
            const query = ctx.query;

            const { movies } = await moviesService.getListWithFilter(query)

            return { status : "success", movies}
        } catch (e) {
            return { status : "error", err: e.message}
        }
    },

    async importFromFile(req, res) {
        try {
            const fileBuffer = req.file.buffer.toString('utf8');
            const movies = await parseFromFile(fileBuffer)
            const createdMovies = []

            for (let movie of movies) {
                const actorsId = await Promise.all(movie.actors.map(async actor => {
                    let exist = await actorService.findActor(actor)
                    if (exist.actor) {
                        return exist.actor
                    }
                    let  {status, actor: newActor, err} = await actorService.setActor(actor)
                    if (status !== 1) {
                        throw new Error(err)
                    }
                    return newActor;
                }));

                const { status, err, movie: newMovie } = await moviesService.setFilm( movie.title, movie.releaseYear, movie.format, actorsId)
                if (status !== 1) {
                    throw new Error(err)
                }
                createdMovies.push(newMovie)
            }

            return { status : "success", createdMovies}
        } catch (e) {
            console.log(e)
            return { status : "error", err: e.message}
        }
    },

}