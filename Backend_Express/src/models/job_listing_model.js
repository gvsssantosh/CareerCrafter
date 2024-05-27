const db = require("../database/db");
const sequelize = require("sequelize");

const Job_Listing = db.define('job_listing_table', {
  job_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  job_title: {
    type: sequelize.STRING(100),
    allowNull: false
  },
  job_industry: {
    type: sequelize.STRING(50),
    allowNull: false
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false
  },
  qualifications: {
    type: sequelize.TEXT,
    allowNull: false
  },
  application_instructions: {
    type: sequelize.TEXT,
    allowNull: false
  },
  created_by: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'admins_table',
      key: 'admin_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  created_on: {
    type: sequelize.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  location: {
    type: sequelize.STRING(100),
    allowNull: false
  },
  min_salary: {
    type: sequelize.DECIMAL(15, 2),
    allowNull: false
  },
  max_salary: {
    type: sequelize.DECIMAL(15, 2),
    allowNull: false
  },
  company_name: {
    type: sequelize.STRING(100),
    allowNull: false
  },
  job_status: {
    type: sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Job_Listing;