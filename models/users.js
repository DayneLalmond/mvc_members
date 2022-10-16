const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {}

// user table of the user data, encrypted password and exported to index
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    // bcrypt hash user password once created, must be an async function to allow the time it takes to create
    {
        hooks: {
            async beforeCreate (userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            async beforeUpdate (userData) {
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