const userModel = require("../model/userModel");

const addUser = async (req, res) => {
  try {
    console.log("user data => ", req.body);
    const { name, email, password, phone, address, answer } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already added, please login",
      });
    }

    const user = await new userModel({
      name,
      email,
      password,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Added successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while adding User",
      error,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const { query } = req.body;
    let users;
    if (query) {
      users = await userModel.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { phone: query, $options: "i" },
        ],
      });
    } else {
      users = await userModel.find();
    }
    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Users found successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in searching users",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting user",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

module.exports = {
  addUser,
  searchUser,
  deleteUser,
  updateUser,
};
