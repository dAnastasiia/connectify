// Queries, invitations, types for GraphQL service
import {
  GraphQLBoolean,
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
  },
});

// Define the schema
export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
