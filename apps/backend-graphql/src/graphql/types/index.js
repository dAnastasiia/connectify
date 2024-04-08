import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import resolvers from '../resolvers';

// Define the Post type
export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: resolvers.getUserById,
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Define the User type
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: resolvers.getPostsByUserId,
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Define the AuthData input type
export const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  fields: {
    accessToken: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
});

// Define the SignupInput input type
export const SignupInputType = new GraphQLInputObjectType({
  name: 'SignupInput',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

// Define the LoginInput input type
export const LoginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});
