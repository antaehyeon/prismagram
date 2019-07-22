import jwt from "jsonwebtoken";

/**
 * yarn add jsonwebtoken
 * https://randomkeygen.com/
 */
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
