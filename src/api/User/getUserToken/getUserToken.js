import { generateToken } from "src/utils.js";

export default {
  Query: {
    getUserToken: async (_, args, { prisma }) => {
      const { email } = args;
      const user = await prisma.user({ email });
      console.log(user);
      return generateToken(user.id);
    }
  }
};
