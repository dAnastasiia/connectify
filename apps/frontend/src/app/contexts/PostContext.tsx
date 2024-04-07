import { createContext } from 'react';

import { ContextProps, IPost } from '@frontend/types';

type PostContextProps = ContextProps<IPost>;

export const PostContext = createContext<PostContextProps>(
  {} as PostContextProps
);
