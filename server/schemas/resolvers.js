const { AuthenticationError } = require('apollo-server-express')
const { BookInput, User } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__V -password')
                .populate('savedBooks')
                return userData
            }
            throw new AuthenticationError('You must log in to see your saved books')
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('Incorrect login information, please try again')
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, {savedBook}, context) => {
            if (context.user){
                const addBook = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: { savedBooks: savedBook}},
                    { new: true }
                );
                return addBook;
            }
            throw new AuthenticationError('You must be logged in to save your books. Please log in')
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const removeBook = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true}
                );
                return removeBook;
            }
            throw new AuthenticationError('You need to be logged in to remove saved books. Please log in')
        }
    }
};

module.exports = resolvers