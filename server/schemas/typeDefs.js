const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Business {
    _id: ID
    name: String!
    address: String!
    description: String!
    price: Int
    quotes: String
    image: String
    followers: [User]
    tags: [Tag]
    reviews: [Review]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    myBusiness: [Business]
    following: [Business]
  }

  type Review {
    _id: ID!
    title: String!
    description: String!
    createdAt: String
    userName: String!
  }

  type Tag {
    name: String!
    businesses: [Business]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID): User
    businesses: [Business]
    business(businessId: ID): Business
    myBusiness: User
    tags: [Tag]
    tag(name: String!): Tag
    businessSearch(query: String!): [Business]
  }

  type Mutation {
    #for login
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    followBusiness(businessId: ID): User
    unfollowBusiness(businessId: ID): User
    leaveReview(
      businessId: ID
      title: String!
      description: String!
      createdAt: String
    ): Business

    #for tags
    createTag(name: String!): Tag

    #for Business
    createBusiness(
      _id: ID
      name: String!
      address: String!
      description: String!
      price: Int
      image: String
      tagName: String
    ): Business
  }
`;

module.exports = typeDefs;

/*
#for business user
        createBusiness(): User
        deleteBusiness(): User
        updateBusiness(): Business

    #for service user
        requestQuote(): user
*/
