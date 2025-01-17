const userModel = require("../model/userModel");

const addUser = async (req, res) => {
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
      return res
        .status(200)
        .send({ success: true, message: "User already exists, please Login" });
    }

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password,
      answer,
    }).save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Adding User",
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
          { phone: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      users = await userModel.find();
    }
    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Users found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Users found Successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Searching Users",
      error,
    });
  }
};


module.exports = {
    addUser,
    searchUser,
}