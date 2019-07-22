// import { prisma } from "../../../../generated/prisma-client";
import { prisma } from "generated/prisma-client";
import { generateToken } from "src/utils.js";

export default {
  Query: {
    getUserToken: async (_, args) => {
      const { email } = args;
      const user = await prisma.user({ email });
      console.log(user);
      return generateToken(user.id);
    }
  }
};
