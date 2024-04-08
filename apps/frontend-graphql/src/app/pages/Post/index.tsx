import PostDetails from '@frontend-graphql/components/posts/post';

import { useGetPost } from '@frontend-graphql/api/posts';
import { PostContext } from '@frontend-graphql/contexts/PostContext';
import withDetailsPageWrapper, {
  GetQuery,
} from '@frontend-graphql/hocs/withDetailsPageWrapper';
import { IPost } from '@frontend-graphql/types';

function WrappedComponent() {
  return <PostDetails />;
}

export default withDetailsPageWrapper<IPost>({
  WrappedComponent,
  idParam: 'postId',
  getQuery: useGetPost as GetQuery,
  Context: PostContext,
});
