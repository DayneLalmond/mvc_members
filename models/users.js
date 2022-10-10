const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
    hooks: {
        async beforeCreate (userData) {
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData;
        }
    },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
}
);

module.exports = User;