// Queries, invitations, types for GraphQL service
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import resolvers from './resolvers';
import {
  AuthDataType,
  LoginInputType,
  SignupInputType,
  UserType,
  PostInputType,
  PostType,
  PostsType,
} from './types';

// Define the RootMutation type
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        inputData: { type: SignupInputType },
      },
      resolve: resolvers.signup,
    },
    login: {
      type: AuthDataType,
      args: {
        inputData: { type: LoginInputType },
      },
      resolve: resolvers.login,
    },
    logout: {
      type: GraphQLBoolean,
      resolve: resolvers.logout,
    },
    createPost: {
      type: PostType,
      args: {
        inputData: { type: PostInputType },
      },
      resolve: resolvers.createPost,
    },
  },
});

// Define the RootQuery type
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'hello',
    },
    getPosts: {
      type: PostsType,
      args: {
        page: { type: GraphQLInt },
      },
      resolve: resolvers.getPosts,
    },
    getPost: {
      type: PostType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: resolvers.getPost,
    },
  },
});

// Define the schema
export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
