const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type User{
        _id: ID!
        username: String!
        email: String!
        password: String!
        myBusiness: [Business]
    }

    type Tag{
        name: String!
        businesses: [Business]
        
    }

    type Business{
        name: String!
        address: String!
        description: String!
        price: Int
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
        tags: [Tag]

    }

    type Mutation{
    #for login
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

    #for tags    
        createTag(name: String!): Tag
    
    #for Business
    createBusiness(name: String!,
            address: String!,
            description: String!,
            price: Int,
            image: String,
            ) : Business
    


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