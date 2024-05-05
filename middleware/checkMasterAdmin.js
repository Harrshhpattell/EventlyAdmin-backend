const AdminAuth = require('../models/adminAuthModel');

// Middleware to check if the admin user is a master admin
const checkMasterAdmin = async (req, res, next) => {
    try {
        // Get the user's ID from the request
        const userId = req.userId;
        
        // Find the user in the database
        const user = await AdminAuth.findById(userId);
        
        // Check if the user exists and has masterAdmin privileges
        if (!user || !user.masterAdmin === 'notactive') {
            return res.status(403).json({ message: "Access denied. You don't have permission to perform this action." });
        }

        // If the user is a master admin, continue to the next middleware
        next();
    } catch (error) {
        console.error("Error checking master admin status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    checkMasterAdmin
};
