const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type User{
        _id: ID!
        username: String!
        email: String!
        hashed_password: String!
    }

    type Tag{
        name: String!
        businesses: [Business]
    }

    type Business{
        name: String!
        address: String!
        description: String!
        price: String
        quotes: String
        image: String
        user: User
        tags: [Tag]
    }

      

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        users: [User]
        businesses: [Business]
        myBusiness: User

    }

    type Mutation{
    #for login
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

    


    }

`

module.exports = typeDefs;

/*
#for business user
        createBusiness(): User
        deleteBusiness(): User
        updateBusiness(): Business

    #for service user
        requestQuote(): user
*/