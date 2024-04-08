const Event = require("../models/eventModel");


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events); 
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

  
exports.getEventsCountByMonth = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Event.aggregate([
      {
        $match: {
        startDateTime: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDateTime" },
          numEvents: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      }
    ]);

    // Initialize an array to store the number of users for each month
    const monthlyEvents = new Array(12).fill(0);

    // Update the monthlyUsers array with the values from the aggregation result
    plan.forEach(monthData => {
      const monthIndex = monthData._id - 1; // Month is 1-indexed
      monthlyEvents[monthIndex] = monthData.numEvents;
    });

    res.json(monthlyEvents);
  } catch (error) {
    console.error('Error fetching monthly events count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Function to delete an event by ID
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete the event
    await Event.findByIdAndDelete(eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}