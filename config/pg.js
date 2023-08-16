const { Sequelize } = require("sequelize");
const env = require("./environment");

const sequelize = new Sequelize(env.db, env.db_username, env.db_password, {
  host: env.db_host,
  dialect: env.db_dialect,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

module.exports = sequelize;
