import PostDetails from '@frontend/components/posts/post';

import { getPost } from '@frontend/api/posts';
import { PostContext } from '@frontend/contexts/PostContext';
import withDetailsPageWrapper from '@frontend/hocs/withDetailsPageWrapper';
import { IPost } from '@frontend/types';

function WrappedComponent() {
  return <PostDetails />;
}

export default withDetailsPageWrapper<IPost>({
  WrappedComponent,
  idParam: 'postId',
  collectionName: 'posts',
  getQuery: getPost,
  Context: PostContext,
});
