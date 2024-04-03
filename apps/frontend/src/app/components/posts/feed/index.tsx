import { useQuery } from '@tanstack/react-query';

import { Box, Grid, Stack, Typography } from '@mui/material';

import Loader from '@frontend/ui-kit/Loader';

import { getPosts } from '@frontend/api/posts';
import { IPost } from '@frontend/types';

import Post from '../card';
import CreatePost from '../create';

export default function Feed() {
  const { data, isLoading, refetch } = useQuery<IPost[]>({
    queryKey: ['feed'],
    queryFn: () => getPosts(),
  });

  if (isLoading) return <Loader />;

  return (
    <Stack>
      <Box mb={3}>
        <CreatePost onCreate={refetch} />
      </Box>

      {data?.length ? (
        <Box>
          <Grid container>
            {data.map((post) => (
              <Grid key={post._id} item xs={12} md={6} lg={4} xl={3}>
                <Post {...post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          No posts yet.
        </Typography>
      )}
    </Stack>
  );
}
