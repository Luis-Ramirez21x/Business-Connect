import { gql } from "@apollo/client";

export const ALL_TAGS = gql`
  query tags {
    tags {
      name
    }
  }
`;

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
      name
      address
      description
      price
      image
    }
  }
`;

export const SINGLE_BUSINESS = gql`
  query singleBusiness($_id: ID!) {
    singleBusiness(_id: $_id) {
      _id
      name
      address
      description
      price
      image
    }
  }
`;
