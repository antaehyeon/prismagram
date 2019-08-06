import { generateSecretWords } from "src/utils.js";

export default {
  Mutation: {
    requestSecret: async (_, args, { prisma }) => {
      const { email } = args;
      const loginSecret = generateSecretWords();
      console.log(loginSecret);
      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch {
        return false;
      }
    }
  }
};
