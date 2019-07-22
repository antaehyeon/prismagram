// import { prisma } from "../../../../generated/prisma-client";
// import { prisma } from "generated/prisma-client";

export default {
  Query: {
    // 3번 째 인자로, prisma를 가져올 수 있음
    // server.js 에서 context: { prisma } 했으므로
    userById: async (_, args, { prisma }) => {
      const { id } = args;
      return await prisma.user({ id }).$fragment();
    }
  }
};
