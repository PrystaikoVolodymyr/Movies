const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB_STORAGE
});


const Users = require('./users')(sequelize);
const Movies = require('./movies')(sequelize);
const Actors = require('./actors')(sequelize);


Movies.belongsToMany(Actors, { through: "MoviesActors"});
Actors.belongsToMany(Movies, { through: "MoviesActors"});


Actors.sync().then(() => {
    console.log('Actors and Actors created!');
})
    .catch((err) => {
        console.error('Error creating tables:', err);
    });
Movies.sync().then(() => {
    console.log('Movies and Movies created!');
})
    .catch((err) => {
        console.error('Error creating tables:', err);
    });

sequelize.sync()
    .then(() => {
        console.log('Database and tables created!');
    })
    .catch((err) => {
        console.error('Error creating tables:', err);
    });


module.exports = {
    Users,
    Movies,
    Actors,
};

