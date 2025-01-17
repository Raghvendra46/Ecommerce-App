const userModel = require("../model/userModel");
const JWT = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    console.log("User Data => ", req.body);
    const { name, email, password, phone, address, answer } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Passsword is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).send({
        success: true,
        message: "User already Registered, please Login",
      });
    }

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("Login Data => ", req.body);
    const { email, password } = req.body;
    if ((!email || !password)) {
      res.status(401).send({
        success: false,
        message: "Invalid Login ID and Password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Login ID",
      });
    }

    if (password != user.password) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error logging in, try again later",
      error,
    });
  }
};

module.exports = {
  signUp,
  login,
};
