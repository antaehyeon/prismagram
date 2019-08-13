export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        return "TOKEN";
      } else {
        throw Error("Wrong Email/Secret Conviation ");
      }
    }
  }
};
