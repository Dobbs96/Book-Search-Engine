import gql from "graphql-tag";

export const GET_ME = gql`
  query {
    me {
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
