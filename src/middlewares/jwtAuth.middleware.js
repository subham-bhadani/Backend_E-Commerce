import jwt from "jsonwebtoken";

const jwtSecret = "7DCCB5957DA8EABEB99F1F36FDE89";

const jwtAuth = (req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userID = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

export default jwtAuth;
