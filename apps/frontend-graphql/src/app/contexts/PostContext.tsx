import { createContext } from 'react';

import { ContextProps, IPost } from '@frontend-graphql/types';

type PostContextProps = ContextProps<IPost>;

export const PostContext = createContext<PostContextProps>(
  {} as PostContextProps
);
