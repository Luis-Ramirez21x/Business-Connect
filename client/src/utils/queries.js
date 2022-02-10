import { gql } from '@apollo/client';

export const ALL_TAGS = gql`
    query tags{
        tags{
            name
        }
    }
`