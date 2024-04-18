const {
    signupUser,
    protectUserRepo,
    loginUser,
  } = require("./authRepository");
  const { promisify } = require("util");
  const jwt = require("jsonwebtoken");

  
  exports.signupService = async (req, res) => {
    const data = req.body;
  
    try {
      const { token, newUser } = await signupUser(data);
  
      // res.cookie("jwt", token, {
      //   maxAge: 5 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   sameSite: "strict",
      // });
      return { token, newUser };
    } catch (error) {
      console.log("Error(signupService):", error);
      throw new Error(error.message);
    }
  };
  
  
  exports.loginService = async (req, res) => {
    const data = req.body;
  
    try {
      const { success, result, statusCode } = await loginUser(data);
      return res.status(statusCode).json({
        success,
        result,
      });
    } catch (error) {
      console.log("Error(loginService):", error);
      throw new Error(error.message);
    }
  };
  
  exports.protectService = async (req, res, next) => {
    try {
      // 1) Getting token and check if it's there
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        return res
          .status(401)
          .json({ success: false, error: "Authentication token is missing" });
      }
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          error: "The User Belonging to this token does no longer exist.",
        });
      }
      const userNotFindError = await protectUserRepo(decoded);
  
      if (userNotFindError) {
        return res.status(401).json({ success: false, error: userNotFindError });
      }
      req.userId = decoded.id;
      // Authentication successful, call next middleware or route handler
      next();
    } catch (error) {
      console.log("Error(protectService):", error);
      throw new Error(error.message);
    }
  };