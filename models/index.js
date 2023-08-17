const sequelize = require("../config/pg");
const User = require("./user");
const Feed = require("./feed");
const Access = require("./access");

User.belongsToMany(Feed, {
  through: Access,
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Feed.hasMany(Access, {
  foreignKey: "feedId",
  onDelete: "CASCADE",
});

// Access.belongsTo(User, { foreignKey: "userId" });

Access.belongsTo(Feed, { foreignKey: "feedId" });

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

    //console.log("Super Admin Created : ", createdUser);
  } catch (error) {
    console.log("Error in creating Super Admin : ", error);
    return;
  }
};

createSuperAdmin();
