import axios from './axios';
import {
  PageableResponse,
  IPost,
  ICreatePost,
  DataResponse,
  IUpdatePost,
} from '@frontend/types';

const mainPath = 'feed';
const postsPath = `${mainPath}/posts`;
const postPath = `${mainPath}/post`;

export const getPosts = async () => {
  const response = await axios.get<PageableResponse<IPost>>(postsPath);

  return response.data?.data;
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
  const formData = new FormData();
  //   for (const key in data) {
  //     formData.append(key, data[key as keyof typeof data] ?? '');
  //   }
  const { id, title, content, image, imageUrl } = data;

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
