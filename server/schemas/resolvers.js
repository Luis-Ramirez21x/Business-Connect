//authentication imports
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

//model imports
const { User, Business, Tag, Review } = require("../models");

const resolvers = {
  Query: {
    //user querys
    users: async () => {
      return User.find().populate("myBusiness");
    },
    user: async (parent, args) => {
      return User.findById(args);
    },

    //business querys
    businesses: async () => {
      return Business.find().populate("reviews");
    },
    business: async (parent, { businessId }, context) => {
      return Business.findById({ _id: businessId });
    },
    /*
        singleBusiness: async(parent, { _id }) => {
          return Business.findOne({ _id: _id });
        },*/

    myBusiness: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }.populate("myBusiness"));
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    businessSearch: async (parent, { query }) => {
      return Business.find({ $text: { $search: query } });
    },

    //tag querys
    tags: async () => {
      return Tag.find().populate("businesses");
    },
    tag: async (parent, { name }) => {
      return Tag.findOne({ name: name }).populate("businesses");
    },
  },

  Mutation: {
    //tag mutations
    createTag: async (parent, { name }, context) => {
      return Tag.create({ name });
    },

    //user mutations
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    followBusiness: async (parent, { businessId }, context) => {
      if (context.user) {
        await Business.findOneAndUpdate(
          { _id: businessId },
          { $addToSet: { followers: context.user._id } },
          { new: true }
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: businessId } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    unfollowBusiness: async (parent, { businessId }, context) => {
      if (context.user) {
        await Business.findOneAndUpdate(
          { _id: businessId },
          { $pull: { followers: context.user._id } },
          { new: true }
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { following: businessId } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    leaveReview: async (
      parent,
      { businessId, title, description, createdAt },
      context
    ) => {
      if (context.user) {
        const newReview = await Review.create({
          title,
          description,
          createdAt,
          username: context.user.username,
        });
        return await Business.findOneAndUpdate(
          { _id: businessId },
          { $addToSet: { reviews: newReview } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //business mutations
    createBusiness: async (
      parent,
      { name, address, description, image, price, tagName },
      context
    ) => {
      if (context.user) {
        const newBusiness = await Business.create({
          name,
          address,
          description,
          image,
          price,
        });
        await Tag.findOneAndUpdate(
          { name: tagName },
          { $addToSet: { businesses: newBusiness._id } },
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { myBusiness: newBusiness._id } },
          { new: true }
        );
        return newBusiness;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    /* deleteBusiness: async (parent,args, context) =>{
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
          }*/
  },
};

module.exports = resolvers;
