import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        profile{
            _id
            username
        }
    }
}`

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        profile {
            _id
            username
        }
    }
}`

export const SAVE_BOOK = gql`
mutation saveBook($userId: ID!, $savedBooks: String!) {
    saveBook(userId: $userId, savedBooks: $savedBooks) {
        _id
        username
        email
        bookCount
        savedBooks 
    }
}`

export const REMOVE_BOOK = gql`
mutation removeBook($savedBooks: String!) {
    removeBook(savedBooks: $savedBooks) {
        _id
        username
        savedBooks
    }
}`