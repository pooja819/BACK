const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCustomer = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(201).json({ code: 0, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new User({
      email,
      password: hashedPassword,
      name,
      role: "customer",
    });

    await newCustomer.save();

    res.status(201).json({ code: 1, message: "Customer created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
