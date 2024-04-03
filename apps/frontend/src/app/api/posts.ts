import axios from './axios';
import {
  PageableResponse,
  IPost,
  ICreatePost,
  PostResponse,
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

export const createPost = async (
  data: ICreatePost
  //   image: File
) => {
  // * Handling files
  //   const fd = new FormData();
  //   for (const key in data) {
  //     fd.append(key, `${data[key as keyof typeof data] ?? ''}`);
  //   }
  //   image && fd.append('imageUrl', image);
  //   await axios.post(postPath, fd, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });

  const response = await axios.post<PostResponse<IPost>>(postPath, data);

  return response.data;
};
