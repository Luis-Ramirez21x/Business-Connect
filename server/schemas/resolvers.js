//authentication imports 
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//model imports 
//import {User, Business, tag} from '../models'


const resolvers = {
    Query: {
        users: async () =>{
            return User.find();
        },
        
        businesses: async() =>{
            return Business.find();
        },

       /* myBusiness: async(parent, args, context) =>{
            if(context.user){
                return Business.find({ })
            }
        },*/

        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };       
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },        
    }
}

module.exports = resolvers;