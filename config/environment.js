const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "5m",
  path: logDirectory,
});

const development = {
  name: "development",
  jwt_secret: "task",
  db: "common",
  db_username: "postgres",
  db_password: "nikhil123",
  db_host: "localhost",
  db_dialect: "postgres",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },
};

const production = {
  name: "production",
  jwt_secret: process.env.TASK_JWT_SECRET,
  db: process.env.DB,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_dialect: process.env.DB_DIALECT,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },
};

// module.exports =
//   eval(process.env.TASK_ENVIRONMENT) == undefined
//     ? development
//     : eval(process.env.TASK_ENVIRONMENT);
module.exports = development;
