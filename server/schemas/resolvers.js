const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args) => {
      return await User.findById(args.id).populate("books");
    },
  },
  Mutation: {
    removeBook: async (_, args) => {
      return await User.remove(args.bookId);
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (_, args) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: args.user._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
