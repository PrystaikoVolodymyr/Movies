const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Movie', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
