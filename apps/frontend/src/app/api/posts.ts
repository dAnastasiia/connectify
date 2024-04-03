import axios from './axios';
import { PageableResponse, IPost, ICreatePost } from '@frontend/types';

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
