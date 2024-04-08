import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import resolvers from '../resolvers';

export const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
});

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

export const PostsType = new GraphQLObjectType({
  name: 'Posts',
  fields: () => ({
    data: {
      type: new GraphQLList(PostType),
    },
    pageNumber: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    totalCount: { type: GraphQLInt },
  }),
});

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

export const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  fields: {
    accessToken: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
});

export const SignupInputType = new GraphQLInputObjectType({
  name: 'SignupInput',
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

export const LoginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});
