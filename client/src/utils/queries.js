import { gql } from '@apollo/client'

export const GET_ME = gql`
{
    me {
        username
        email
        _id
        bookCount
        savedBooks {
            title
            authors
            image
            bookId
            link
        }
    }
}`