import httpStatus from "http-status";
import { createToken, verifyToken } from "../utils/tokenisation";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const isVerified = JwtHelpers.verifyToken(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    if (!isVerified) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
    } else {
      // Assign custom properties to the req object

      req.user_id = isVerified?.user_id;
      req.email = isVerified?.email;
      req.role = isVerified?.role;
      if (req.role !== "ADMIN") {
        if (req.params.user_id) {
          if (req.params.user_id !== req.user_id) {
            throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
          } else {
            next();
          }
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Token not found");
  }
};

export default verifyToken;
