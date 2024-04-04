import axios from './axios';
import {
  PageableResponse,
  IPost,
  ICreatePost,
  IUpdatePost,
} from '@frontend/types';

const mainPath = 'feed';
const postsPath = `${mainPath}/posts`;
const postPath = `${mainPath}/post`;

export const getPosts = async (page: number) => {
  const response = await axios.get<PageableResponse<IPost>>(postsPath, {
    params: { page },
  });

  return response.data;
};

export const getPost = async (id: string) => {
  const response = await axios.get(`${postPath}/${id}`);

  return response.data;
};

export const createPost = async (data: ICreatePost) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key as keyof typeof data] ?? '');
  }

  await axios.post(postPath, formData, {
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

  await axios.put(`${postPath}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deletePost = async (id: string) =>
  await axios.delete(`${postPath}/${id}`);
