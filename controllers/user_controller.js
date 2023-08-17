const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

module.exports.login = async function (req, res) {
  try {
    let user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Login Successfully!",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: 100000 }),
      },
    });
  } catch (error) {
    console.log("Error in logging in the user : ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.create = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({
        message: "User is already exists!",
      });
    }

    await User.create({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).json({
      message: "User Registered Successfully!",
    });
  } catch (error) {
    console.log("Error in creating a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};
