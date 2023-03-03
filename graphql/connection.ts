import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data)
  }
`;

export const signin = gql`
  mutation Signin($password: String!, $email: String!) {
    signin(password: $password, email: $email)
  }
`;

export const me = gql`
  query Me {
    me {
      orders {
        id
        billingfirstname
        billingLastname
        billingAdress
        deliveryfirstname
        deliveryLastname
        deliveryAdress
        totalPrice
        statusDelivery
        date
        reservations {
          id
          product {
            id
            name
            description
            image
            price
            quantity
            disponibility
            category {
              id
              name
            }
          }
          startDate
          endDate
          quantity
          price
          taxes
        }
      }
      createdAt
      deliveryAdress
      lastname
      firstname
      email
      id
      cart {
        id
        billingfirstname
        billingLastname
        billingAdress
        deliveryfirstname
        deliveryLastname
        deliveryAdress
        lastTimeModified
        reservations {
          id
          startDate
          endDate
          quantity
          price
          taxes
          product {
            id
            name
            description
            image
            price
            quantity
            disponibility
            category {
              id
              name
            }
          }
        }
      }
    }
  }
`;
