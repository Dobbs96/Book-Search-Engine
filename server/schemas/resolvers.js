const { Book, User } = require("../models");

const resolvers = {
  Query: {
    me: async () => {
      return await User.findById(args.id).populate("books");
    },
  },
};

module.exports = resolvers;
