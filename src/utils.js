import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

import { adjectives, nouns } from "src/words.js";

export const generateSecretWords = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendSecretMail = (address, secret) => {
  const msg = {
    from: "prismagram@nomadcoder.co",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret it <b>${secret}</b>.<br/>Copy paste on the app/website to log in`
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(msg);
};

/**
 * yarn add jsonwebtoken
 * https://randomkeygen.com/
 */
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
