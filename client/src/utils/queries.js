import { gql } from '@apollo/client';

export const ALL_TAGS = gql`
    query tags{
        tags{
            name
        }
    }
`;

export const BUSINESSES_BY_TAG = gql`
query tag( $name: String!){
    tag(name: $name){
        name
        businesses{
            name
  
        }
    }
}
`;