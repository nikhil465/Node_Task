const Access = require("../models/access");
const Feed = require("../models/feed");
const User = require("../models/user");

module.exports.create = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let feed = await Feed.create({
      name: req.body.name,
      url: req.body.url,
      description: req.body.description,
    });

    return res.status(200).json({
      message: "Feed uploaded Successfully!",
      data: {
        feed: feed.dataValues,
      },
    });
  } catch (error) {
    console.log("Error in creating a feed : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    let feed = await Feed.findByPk(req.params.id);
    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    feed.dataValues.name = req.body.name;
    feed.dataValues.url = req.body.url;
    feed.dataValues.description = req.body.description;

    feed.save();

    return res.status(200).json({
      message: "Feed Updating Successfully!",
    });
  } catch (error) {
    console.log("Error in updating a feed : ", error);
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

    let feed = await Feed.findOne({ where: { id: req.params.id } });
    if (!feed) {
      return res.status(400).json({
        message: "Feed not found",
      });
    }

    if (req.user.role !== "Super Admin") {
      let access = await Access.findOne({
        where: { userId: req.user.id, feedId: req.params.id },
      });

      if (!access) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    feed.destroy();

    return res.status(200).json({
      message: "Feed deleted Successfully!",
    });
  } catch (error) {
    console.log("Error in creating a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.getFeedById = async function (req, res) {
  try {
    if (req.user.role === "Super Admin" || req.user.role === "Admin") {
      let feed = await Feed.findByPk(req.params.id, {
        attributes: { exclude: ["id"] },
      });

      if (!feed) {
        return res.status(404).json({ message: "Feed not found " });
      }

      return res.status(200).json({
        message: "Success",
        data: feed,
      });
    }

    let access = await Access.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: Feed,
          where: {
            id: req.params.id,
          },
        },
      ],
      attributes: {
        exclude: ["FeedId", "id"],
      },
    });
    // let feed = await Feed.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: Access,
    //       where: {
    //         userId: req.user.id,
    //         permission: "r", // Check for read permission
    //       },
    //       required: true,
    //     },
    //   ],
    // });

    console.log(access);

    if (!access) {
      return res
        .status(404)
        .json({ message: "Feed not found or unauthorized to access." });
    }

    return res.status(200).json({
      message: "Success",
      data: access.Feed,
    });
  } catch (error) {
    console.log("Error in creating a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.getAllFeeds = async function (req, res) {
  try {
    if (req.user.role === "Super Admin" || req.user.role === "Admin") {
      let feed = await Feed.findAll(
        {},
        {
          attributes: { exclude: ["id"] },
        }
      );

      if (!feed) {
        return res.status(404).json({ message: "Feed not found " });
      }

      return res.status(200).json({
        message: "Success",
        data: feed,
      });
    }

    let access = await Access.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Feed,
        },
      ],
      attributes: {
        exclude: ["FeedId", "id"],
      },
    });
    // let feed = await Feed.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: Access,
    //       where: {
    //         userId: req.user.id,
    //         permission: "r", // Check for read permission
    //       },
    //       required: true,
    //     },
    //   ],
    // });

    console.log(access);

    if (!access) {
      return res
        .status(404)
        .json({ message: "Feed not found or unauthorized to access." });
    }

    return res.status(200).json({
      message: "Success",
      data: access,
    });
  } catch (error) {
    console.log("Error in creating a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.access = async function (req, res) {
  try {
    if (req.user.role !== "Super Admin" && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    let feed = await Feed.findByPk(req.params.id);
    let user = await User.findByPk(req.body.userId);

    if (!feed || !user) {
      return res.status(404).json({ message: "Feed or User not found." });
    }

    let [access, created] = await Access.findOrCreate({
      where: {
        userId: user.id,
        feedId: feed.id,
        permission: user.role === "Admin" ? "d" : "r",
      },
    });

    if (created) {
      return res.status(200).json({
        message: "Successfully gave the access!!",
      });
    }

    return res.status(400).json({
      message: "Already Gave Access",
    });
  } catch (error) {
    console.log("Error in giving access to user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};
