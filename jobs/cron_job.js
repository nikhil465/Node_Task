const fs = require("fs");
const cron = require("node-cron");

const logDirectory = "./production_logs";

const deleteOldLogFiles = () => {
  console.log("Started deleting ");
  const cutoffTime = Date.now() - 30 * 60 * 1000; // 30 minutes ago
  fs.readdir(logDirectory, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = `${logDirectory}/${file}`;
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) throw statErr;
        console.log(filePath, stats.mtimeMs < cutoffTime);
        if (stats.isFile() && stats.mtimeMs < cutoffTime) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Error deleting file ${filePath}:`, unlinkErr);
            }
            console.log("Deleted", filePath);
          });
        }
      });
    });
  });
  console.log("Deleted All the files");
};

var deleteTask = cron.schedule("*/30 * * * *", deleteOldLogFiles);

module.exports = deleteTask;
