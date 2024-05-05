const AdminAuth = require('../models/adminAuthModel');

// Fetch all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminAuth.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Toggle admin status (active/blocked)
const toggleAdminStatus = async (req, res) => {
    const { id } = req.params;
    try {
      // Find the admin by ID
      const admin = await AdminAuth.findById(id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Toggle the status
      admin.status = admin.status === 'active' ? 'blocked' : 'active';
      await admin.save();
  
      res.json({ message: 'Admin status updated successfully', admin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Delete admin by ID
const deleteAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAdmin = await AdminAuth.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({ message: 'Admin deleted successfully', admin: deletedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAdmins,
    toggleAdminStatus,
    deleteAdminById
};
