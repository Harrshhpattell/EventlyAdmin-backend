const {
    signupService,
    protectService,
    loginService,
  } = require("./authService");
  const {
    userSignupValidation,
    userLoginValidation,
  } = require("../../Validation/validation");
  
  exports.signup = async (req, res) => {
    try {
      const data = req.body;
      console.log("harshh:", data);
      const validationError = userSignupValidation(data);
  
      if (validationError) {
        return res.status(400).json({ success: false, error: validationError });
      }
  
      const result = await signupService(req, res);
      res.status(201).json({
        success: true,
        result,
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };
  
  
  exports.login = async (req, res) => {
    try {
      const data = req.body;
      const validationError = userLoginValidation(data);
      if (validationError) {
        return res.status(400).json({ success: false, error: validationError });
      }
  
      await loginService(req, res);
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };
  
  exports.protect = async (req, res, next) => {
    try {
      await protectService(req, res, next);
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };