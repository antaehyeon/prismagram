import { generateSecretWords, sendSecretMail } from "src/utils.js";

export default {
  Mutation: {
    requestSecret: async (_, args, { prisma }) => {
      const { email } = args;
      const loginSecret = generateSecretWords();
      console.log(loginSecret);
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (err) {
        console.log("[request secret] catch error", err);
        return false;
      }
    }
  }
};
