const jwt = require("jsonwebtoken");
import User from "../../models/User";

export const getUserId = async (req: any, _res: any, next: any) => {
  console.log("Reached: getUserId");
  // initial assumptions
  req.contains_token = true;
  req.token_is_valid = true;

  // get token
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  // verify if token format is valid
  if (!token) {
    req.user_id = null;
    req.contains_token = false;
    next();
    return;
  }
  if (token.split(".").length !== 3) {
    req.user_id = null;
    req.contains_token = false;
    next();
    return;
  }

  try {
    // get token data
    const decoded = jwt.verify(token, process.env.JWT_PVT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      req.user_id = null;
      req.token_is_valid = false;
      next();
      return;
    }
    req.user_id = decoded.id;
    req.user = user;
    next();
    return;
  } catch (err: any) {
    // error (token invalid probably)
    console.log(err.message);
    req.user_id = null;
    req.token_is_valid = false;
    next();
    return;
  }
};
