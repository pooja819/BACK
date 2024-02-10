const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET_KEY = "sd23fs43sdf5r4ds32ft45tg2hf";

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(201).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(201)
        .json({ message: "Invalid email or password", code: 0 });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY);

    res.json({
      token: token,
      message: "User Login Successfully !",
      code: 1,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
