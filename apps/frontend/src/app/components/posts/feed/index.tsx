import { useQuery } from '@tanstack/react-query';

import { Grid } from '@mui/material';

import { getPosts } from '@frontend/api/posts';
import { IPost } from '@frontend/types';
import Loader from '@frontend/ui-kit/Loader';

import Post from '../card';

export default function Feed() {
  const { data, isLoading, refetch } = useQuery<IPost[]>({
    queryKey: ['feed'],
    queryFn: () => getPosts(),
  });

  if (isLoading) return <Loader />;

  return (
    <Grid container>
      {data?.map((post) => (
        <Grid key={post.title} item md={6} lg={4}>
          <Post {...post} />
        </Grid>
      ))}
    </Grid>
  );
}
