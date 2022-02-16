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
mutation addUser ($username : String!, $email: String! $password: String!){
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
mutation createBusiness($name: String!, $address: String!, 
    $description: String!, $price: String!, $image: String, 
    $tagName: String!, $businessEmail: String!, $phoneNumber: String){
    createBusiness(name :$name, address: $address, description:$description, 
        price: $price, image: $image, tagName: $tagName, 
        businessEmail: $businessEmail, phoneNumber: $phoneNumber){
        name
        address
        description
        
    }
}
`;

export const UPDATE_BUSINESS =gql`
mutation updateBusiness($_id: ID, $name: String!, $address: String!, 
    $description: String!, $price: String!, $image: String, $tagName: String, 
    $businessEmail: String!, $phoneNumber: String){
      updateBusiness(_id: $_id, name :$name, address: $address, 
        description:$description, price: $price, image: $image, tagName: $tagName, 
        businessEmail: $businessEmail, phoneNumber: $phoneNumber){
          name
          address
          description
      }
  }
`;

export const POST_REVIEW = gql`
mutation leaveReview($businessId: ID, $title: String!, $description: String!, $rating: Int){
    leaveReview(businessId:$businessId, title: $title, description: $description, rating: $rating){
          name
          reviews {
            title
            description
          }
    }   
}
`;

export const FOLLOW_BUSINESS = gql`
mutation followBusiness($businessId: ID) {
  followBusiness(businessId: $businessId){
      username
      following{
        _id
      }
  }	
}
`;

export const UNFOLLOW_BUSINESS = gql`
  mutation unfollowBusiness($businessId: ID) {
      unfollowBusiness(businessId: $businessId){
          following {
              _id
          }
      }
  }
`;