//authentication imports 
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//model imports 
const { User, Business, Tag } = require('../models');


const resolvers = {
    Query: {
        users: async () =>{
            return User.find();
        },
        businesses: async() =>{
            return Business.find();
        },
        myBusiness: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }.populate('myBusiness'));
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },

    Mutation: {

        //user mutations
        addUser: async (parent, { username, email, hashed_password }) => {
            const user = await User.create({ username, email, hashed_password });
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

          //business mutations
          createBusiness: async (parent,args, context) =>{
            if(context.user){
              const newBusiness = await Business.create(args);
              return await User.findOneAndUpdate(
                {_id: context.user._id},
                { $addToSet: { myBusiness: newBusiness }},
                { new: true}
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteBusiness: async (parent,args, context) =>{
            if(context.user){
              return await Business.deleteOne({_id:args._id})
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          updateBusiness: async (parent,args, context) =>{
            if(context.user){
              return await Business.finOneAndUpdate(
                {_id: id},
                {args},
                {new:true}
              )
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          
          //client mutations
          requestQuote: async (parent, {businessId, quoteText}, context) =>{
              if(context.user){
                //create a quote schema to be attached to that business which can then be populated in messages
                return Business.finOneAndUpdate(
                  {_id:businessId},
                  { $addToSet: { quotes: { quoteText }}},
                  { new: true},
                );
              }
          }
    }
}

module.exports = resolvers;