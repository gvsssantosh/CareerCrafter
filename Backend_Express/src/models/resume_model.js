const db = require("../database/db");
const sequelize = require("sequelize");


const Resume_db_model = db.define('resume_db', {
    resume_id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users_table',
            key: 'user_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    },
    projects: {
        type: sequelize.TEXT
    },
    Skills: {
        type: sequelize.TEXT
    },
    Certifications: {
        type: sequelize.TEXT
    },
    internships: {
        type: sequelize.TEXT
    },
    work_experience: {
        type: sequelize.TEXT
    },
    created_on: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    last_updated: {
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    resume_file_link: {
        type: sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// Export the Resume model
module.exports = Resume_db_model;