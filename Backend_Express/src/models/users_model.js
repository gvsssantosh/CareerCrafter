const db = require("../database/db");
const sequelize = require("sequelize");


const Users_model = db.define(
    'users_table',
    {
        user_id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        password: {
            type: sequelize.STRING(100),
            allowNull: false
        },
        first_name: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        last_name: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        phone_number: {
            type: sequelize.CHAR(10),
            allowNull: false
        }
    },
    {
        timestamps: false,
        // Disable timestamps (createdAt and updatedAt)
        freezeTableName: true
    });

module.exports = Users_model;