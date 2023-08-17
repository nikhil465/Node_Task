const sequelize = require("../config/pg");
const { DataTypes } = require("sequelize");
const Access = require("./access");
const User = require("./user");

const Feed = sequelize.define("Feed", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Feed;
