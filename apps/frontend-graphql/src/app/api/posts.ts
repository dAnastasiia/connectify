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
              imageUrl
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

export const useGetPost = ({
  queryKey,
  id,
}: {
  queryKey: QueryKey;
  id: string;
}) => {
  const { data, isLoading, error, refetch } = useGraphQLQuery<IPost>({
    queryKey,
    queryFn: async () => {
      const { getPost } = await graphQLClient.request(gql`
         query {
           getPost (id: "${id}") {             
               _id
               title
               content
               imageUrl
               author {
                 name
               }
               createdAt
               updatedAt            
           }
         }
       `);

      return getPost;
    },
  });

  return { data, isLoading, error, refetch };
};

export const useCreatePost = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending } = useGraphQLMutation({
    mutationFn: async ({ title, content, image }: ICreatePost) => {
      const formData = new FormData();

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`post-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.filePath;

      const { createPost } = await graphQLClient.request(gql`
            mutation { 
              createPost(inputData: { title: "${title}", content: "${content}", imageUrl: "${imageUrl}" }) { 
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

export const useUpdatePost = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (errors: CustomError[]) => void;
}) => {
  const { mutate, isPending } = useGraphQLMutation({
    mutationFn: async ({
      id,
      title,
      content,
      image,
      imageUrl: oldImageUrl,
    }: IUpdatePost) => {
      const formData = new FormData();

      if (image) {
        formData.append('image', image);
        formData.append('oldPath', oldImageUrl);
      }

      const response = await axios.put(`post-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.filePath;

      const { createPost } = await graphQLClient.request(gql`
             mutation { 
               createPost(inputData: { title: "${title}", content: "${content}", imageUrl: "${imageUrl}" }) { 
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
