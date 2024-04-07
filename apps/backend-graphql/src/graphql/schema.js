// Queries, invitations, types for GraphQL service
import {
  buildSchema,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import { newSchemaResolvers } from './resolvers';

// * ----------- OLD SYNTAX -----------
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

// * ----------- NEW SYNTAX -----------
// Define the Post type
var PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: newSchemaResolvers.getUserById,
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Define the User type
var UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: newSchemaResolvers.getPostsByUserId,
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Define the SignupInput input type
const SignupInputType = new GraphQLInputObjectType({
  name: 'SignupInput',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

// Define the RootMutation type
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        inputData: { type: SignupInputType },
      },
      resolve: newSchemaResolvers.signup,
    },
  },
});

// Define the RootQuery type
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => {
        return 'hello';
      },
    },
  },
});

// Define the schema
export const newSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
