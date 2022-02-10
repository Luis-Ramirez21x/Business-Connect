import { gql } from '@apollo/client';

//login mutations
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser ($username : String!, $email,: String! $password: String!){
    addUser(username :$username , email:$email, password:$password){
        token
        user{
          _id
          username
          email
          
        }
       
    }
}
`;
//tag mutations
export const CREATE_TAG = gql`
mutation createTag($name: String!){
    createTag(name: $name){
      name
    }
}
`;
//business mutations
export const CREATE_BUSINESS = gql`
mutation createBusiness($name: String!, $address: String!, $description: String!, $price: Int, $image: String){
    createBusiness(name :$name, address: $address, description:$description, price: $price, image: $image){
        name
        address
        description
    }
}
`