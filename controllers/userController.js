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

  
exports.getUsersCountByMonth = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          numUsers: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      }
    ]);

    // Initialize an array to store the number of users for each month
    const monthlyUsers = new Array(12).fill(0);

    // Update the monthlyUsers array with the values from the aggregation result
    plan.forEach(monthData => {
      const monthIndex = monthData._id - 1; // Month is 1-indexed
      monthlyUsers[monthIndex] = monthData.numUsers;
    });

    res.json(monthlyUsers);
  } catch (error) {
    console.error('Error fetching monthly user count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

