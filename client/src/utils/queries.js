import { gql } from '@apollo/client'

export const GET_ME = gql`
{
    me {
        username
        email
        _id
        password
        savedBooks
    }
}`