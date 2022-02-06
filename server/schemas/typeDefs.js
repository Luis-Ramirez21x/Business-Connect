const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type User{
        
    }

    type Business{
        
    }

    type Tag{

    }   

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query{
        reviews(businessId: ID!) : ****** 
        businesses: [Business]
        me: Profile

    }

    type Mutation{
    #for login
        createUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

    #for business user
        createBusiness():*****
        deleteBusiness(): *****
        updateBusiness():******

    #for service user
        followBusiness(): User
        removeBusiness(): User
        followUser(): User
        removeUser(): User


    }

`