const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("Token => ", token);
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization Token is missing.",
      });
    }
    const validToken = JWT.verify(token, process.env.JWT_SECRET);
    req.user = validToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired Token.p",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

const isUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    requireSignIn,
    isAdmin,
    isUser,
}