import axios from './axios';
import { PageableResponse, IPost } from '@frontend/types';

const path = 'feed/posts';

export const getPosts = async () => {
  const response = await axios.get<PageableResponse<IPost>>(path);

  return response.data?.data;
};
