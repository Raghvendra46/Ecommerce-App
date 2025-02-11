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

    // Save User
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
    if (!email || !password) {
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
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate Token
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

const testApi = (req, res) => {
  try {
    res.send("Protected Route...");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    if (!newPassword) {
      return res.send({ message: "New Password is required" });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Incorrect Email or Answer",
      });
    }

    await userModel.findByIdAndUpdate(user._id, { password: newPassword });

    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while resetting the password.",
      error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({
        error:
          "Password is required and its length must be more than 6 characters.",
      });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Updating Profile",
      error,
    });
  }
};

module.exports = {
  signUp,
  login,
  testApi,
  forgotPassword,
  updateProfile,
};
