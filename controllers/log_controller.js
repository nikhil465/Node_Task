const fs = require("fs");

module.exports.logs = function (req, res) {
  try {
    if (req.user.role !== "Super Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let logDir = "./production_logs";

    const now = new Date();
    const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);

    const logFiles = fs
      .readdirSync(logDir)
      .filter(
        (file) => fs.statSync(`${logDir}/${file}`).ctime > fiveMinutesAgo
      );

    let logs = "";
    logFiles.forEach((file) => {
      const content = fs.readFileSync(`${logDir}/${file}`, "utf-8");
      logs += content + "\n";
    });

    return res.status(200).json({
      message: "Success",
      data: {
        logs: logs,
      },
    });
  } catch (error) {
    console.log("Error in finding a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};
