const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type User{
        _id: ID!
        username: String!
        email: String!
        hashed_password: String!
    }

      

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query{
        users: [User]
        businesses: [Business]
        me: User

    }

    type Mutation{
    #for login
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

    #for business user
        createBusiness(): User
        deleteBusiness(): User
        updateBusiness(): Business

    #for service user
        requestQuote(): user


    }

`

module.exports = typeDefs;