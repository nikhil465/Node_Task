const sequelize = require("../config/pg");
const { DataTypes } = require("sequelize");

const Access = sequelize.define("Access", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  permission: {
    type: DataTypes.STRING(1), // 'd' for delete, 'r' for read
    allowNull: false,
  },
});

module.exports = Access;
