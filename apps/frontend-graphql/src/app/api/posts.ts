import { gql } from 'graphql-request';
import graphQLClient from './graphql';

import useGraphQL from '@frontend-graphql/hooks/useGraphQL';

import axios from './axios';
import {
  PageableResponse,
  IPost,
  ICreatePost,
  IUpdatePost,
  CustomError,
} from '@frontend-graphql/types';

const path = 'posts';

export const getPosts = async (page: number) => {
  const response = await axios.get<PageableResponse<IPost>>(path, {
    params: { page },
  });

  return response.data;
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
  const { mutate, isPending } = useGraphQL({
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
export const createPost = async (data: ICreatePost) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key as keyof typeof data] ?? '');
  }

  await axios.post(path, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
