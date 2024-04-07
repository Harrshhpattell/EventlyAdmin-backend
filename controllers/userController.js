const User = require("../models/userModel");


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  