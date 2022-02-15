import { gql } from "@apollo/client";

export const ALL_TAGS = gql`
  query tags {
    tags {
      name
    }
  }
`;

export const TAGGED = gql`
  query tagged($_id: ID) {
    tagged(_id:$_id) {
      name
    }
  }
`

export const BUSINESSES_BY_TAG = gql`
  query tag($name: String!) {
    tag(name: $name) {
      name
      businesses {
        _id
        name
        address
        description
        price
        image
      }
    }
  }
`;

export const BUSINESS_SEARCH = gql`
  query businessSearch($query: String!) {
    businessSearch(query: $query) {
      _id
      name
      address
      description
      price
      image
    }
  }
`;

export const SINGLE_BUSINESS = gql`
  query business($_id: ID!) {
    business(businessId: $_id) {
      _id
      name
      address
      description
      price
      image
      reviews {
        title
        description
      }
    }
  }
`;

export const MY_FOLLOWS = gql`

query user{
    user{
        username
        email
        following{
            _id
            name
        }
        myBusiness{
            name
            followers{
                username
            }
        }
    }
}
`;

export const MY_BUSINESS = gql`
  query user{
    user{
        myBusiness{
          _id
          name
          address
          description
          price
          image
        }
    }
  }
`;
/*
export const MY_FOLLOWERS = gql`
query user{
    user{
        username
        myBusiness{
            name
            followers{
            username
            }
        }
    }
}

`*/

