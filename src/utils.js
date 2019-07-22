import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import jwt from "jsonwebtoken";

/**
 * yarn add jsonwebtoken
 * https://randomkeygen.com/
 */
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
