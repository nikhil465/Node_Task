const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

module.exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    console.log(user);
    if (user.password !== req.body.password) {
      return res.status(422).json({
        message: "Invalid Email/Password",
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

    if (req.body.role === "Super Admin" && req.user.role === "Super Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (
      (req.body.role === "Admin" || req.body.role === "Super Admin") &&
      (req.user.role === "User" || req.user.role === "Admin")
    ) {
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

module.exports.update = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.body.role === "Super Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.dataValues.name = req.body.name;
    user.dataValues.email = req.body.email;
    user.dataValues.password = erq.body.password;

    user.save();

    return res.status(200).json({
      message: "User Updated Successfully!",
    });
  } catch (error) {
    console.log("Error in Updating a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      (user.role === "Admin" || user.role === "Super Admin") &&
      (req.user.role === "User" || req.user.role === "Admin")
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    user.destroy();

    return res.status(200).json({
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    console.log("Error in Deleting a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      (user.role === "Admin" || user.role === "Super Admin") &&
      (req.user.role === "User" || req.user.role === "Admin")
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({
      message: "Success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log("Error in finding a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};
