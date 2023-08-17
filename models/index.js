const sequelize = require("../config/pg");
const User = require("./user");
const Feed = require("./feed");
const Access = require("./access");

User.belongsToMany(Feed, {
  through: Access,
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Feed.belongsToMany(User, {
  through: Access,
  foreignKey: "feedId",
  onDelete: "CASCADE",
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error in syncing the database :", err);
  });

const createSuperAdmin = async function () {
  try {
    let user = await User.findOne({ where: { role: "Super Admin" } });

    if (user) {
      console.log("Super Admin Already Exists");
      return;
    }

    let createdUser = await User.create({
      name: "Nikhil Lomate",
      role: "Super Admin",
      email: "superadmin@company.com",
      password: "superadmin@123",
    });

    console.log("Super Admin Created : ", createdUser);
  } catch (error) {
    console.log("Error in creating Super Admin : ", error);
    return;
  }
};

createSuperAdmin();
