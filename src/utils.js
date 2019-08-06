import jwt from "jsonwebtoken";
import { adjectives, nouns } from "src/words.js";

export const generateSecretWords = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

/**
 * yarn add jsonwebtoken
 * https://randomkeygen.com/
 */
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
