module.exports = {
    async parseFromFile(data) {
        try {
            const moviesData = data.split('\n\n'); // Split by empty lines to separate movies
            let moviesArray = []
            for (const movieText of moviesData) {
                const movieLines = movieText.split('\n');
                const movie = {};

                for (const line of movieLines) {
                    const [key, value] = line.split(': ');

                    if (key === 'Title') {
                        movie.title = value;
                    } else if (key === 'Release Year') {
                        movie.releaseYear = parseInt(value, 10);
                    } else if (key === 'Year') {
                        movie.releaseYear = parseInt(value, 10);
                    } else if (key === 'Format') {
                        movie.format = value;
                    } else if (key === 'Stars') {
                        movie.actors = value.split(', ');
                    }
                }
                moviesArray.push(movie)
            }
            return moviesArray
        } catch (e) {
            console.log(e)
        }
    }
}