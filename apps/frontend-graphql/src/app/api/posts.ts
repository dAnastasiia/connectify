import { gql } from 'graphql-request';
import graphQLClient from './graphql';

import { QueryKey } from '@tanstack/react-query';

import {
  useGraphQLMutation,
  useGraphQLQuery,
} from '@frontend-graphql/hooks/useGraphQL';

import axios from './axios';
import {
  PageableResponse,
  IPost,
  ICreatePost,
  IUpdatePost,
  CustomError,
} from '@frontend-graphql/types';

const path = 'posts';

export const useGetPosts = ({
  queryKey,
  page,
}: {
  queryKey: QueryKey;
  page: number;
}) => {
  const { data, isLoading, error } = useGraphQLQuery<PageableResponse<IPost>>({
    queryKey,
    queryFn: async () => {
      const { getPosts } = await graphQLClient.request(gql`
        query {
          getPosts (page: ${page}) {
            data {
              _id
              title
              content
              author {
                name
              }
              createdAt
            }
            pageNumber
            pageSize
            totalCount
          }
        }
      `);

      return getPosts;
    },
  });

  return { data, isLoading, error };
};

export const getPost = async (id: string) => {
  const response = await axios.get(`${path}/${id}`);

  return response.data;
};

export const useCreatePost = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending } = useGraphQLMutation({
    mutationFn: async ({ title, content }: ICreatePost) => {
      const { createPost } = await graphQLClient.request(gql`
            mutation { 
              createPost(inputData: { title: "${title}", content: "${content}", imageUrl: "dummy url" }) { 
                _id
                title
                author {
                  name
                }
                createdAt
              } 
            }
          `);

      return createPost;
    },
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};

export const updatePost = async (data: IUpdatePost) => {
  const { id, title, content, image, imageUrl } = data;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('imageUrl', imageUrl);

  if (image) {
    formData.append('image', image);
  }

  await axios.put(`${path}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deletePost = async (id: string) =>
  await axios.delete(`${path}/${id}`);
