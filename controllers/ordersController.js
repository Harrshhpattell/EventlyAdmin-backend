const Orders = require("../models/ordersModel");


exports.getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders); 
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  

exports.getOrdersCountByMonth = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const orders = await Orders.aggregate([
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
          numOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      }
    ]);

    // Initialize an array to store the number of orders for each month
    const monthlyOrders = new Array(12).fill(0);

    // Update the monthlyOrders array with the values from the aggregation result
    orders.forEach(monthData => {
      const monthIndex = monthData._id - 1; // Month is 1-indexed
      monthlyOrders[monthIndex] = monthData.numOrders;
    });

    res.json(monthlyOrders);
  } catch (error) {
    console.error('Error fetching monthly order count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

