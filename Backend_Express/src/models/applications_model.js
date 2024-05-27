const db = require("../database/db");
const sequelize = require("sequelize");

const Application_model = db.define('applications_table', {
  Application_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  job_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'job_listing_table',
      key: 'job_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  Applied_on: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  Updated_on: {
    type: sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
  Status: {
    type: sequelize.ENUM('Pending', 'Reviewed', 'Rejected'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  employer_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'admins_table',
      key: 'admin_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
},
  {
    timestamps: false,
    freezeTableName: true
  });

module.exports = Application_model;
