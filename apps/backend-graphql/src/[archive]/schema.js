// Queries, invitations, types for GraphQL service
import { buildSchema } from 'graphql';

// if no "!" will be return an error for the wrong type
export const schema = buildSchema(`
   type Post {
      _id: ID!
      title: String!
      cpntent: String!
      imageUrl: String!
      author: User!
      createdAt: String!
      updatedAt: String!
   }

   type User {
      _id: ID!
      name: String!
      email: String!
      password: String
      status: String!
      posts: [Post!]!
   }

   input SignupInput {
      name: String!
      email: String!
      password: String!
   }

   type RootQuery {
      hello: String
   }

   type RootMutation {
      signup(inputData: SignupInput): User!
   }

   schema {
      query: RootQuery
      mutation: RootMutation
   }
`);
