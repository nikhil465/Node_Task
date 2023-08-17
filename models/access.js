const sequelize = require("../config/pg");
const { DataTypes } = require("sequelize");

const Access = sequelize.define("Access", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permission: {
    type: DataTypes.STRING(1), // 'd' for delete, 'r' for read
    allowNull: false,
  },
});

module.exports = Access;
