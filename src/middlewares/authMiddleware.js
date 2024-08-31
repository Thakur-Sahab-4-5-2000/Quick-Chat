import jwt from "jsonwebtoken";
import { handleError, sendResponse } from "../utils/sendResponse.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  const ip = req.ip || req.connection.remoteAddress;

  console.log("Received token:", token); // Debugging line

  try {
    if (!token || token.trim() === "") {
      return sendResponse(res, 401, "Please provide a valid token");
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return sendResponse(res, 401, "Token format is incorrect");
    }

    const normalToken = tokenParts[1];

    jwt.verify(normalToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return handleError(res, err, ip, req.user, req.originalUrl);
      }

      req.user = decoded;
      console.log("req.user:", req.user); 
      next();
    });
  } catch (error) {
    console.error("Middleware Error:", error); // Debugging line
    handleError(res, error, ip, req.user, req.originalUrl);
  }
};

export default authMiddleware;
