export default {
  Query: {
    allUsers: () => prisma.users()
  }
};
