import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';

import Loader from '@frontend/ui-kit/Loader';

import { getPosts } from '@frontend/api/posts';
import { IPost, PageableResponse } from '@frontend/types';

import Post from '../card';
import CreatePost from '../create';

export default function Feed() {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery<PageableResponse<IPost>>({
    queryKey: ['feed', page],
    queryFn: () => getPosts(page),
  });

  if (isLoading) return <Loader />;

  const posts = data?.data;
  const totalCount = data?.totalCount || 0;
  const pageSize = data?.pageSize || 1;

  const pagesQuantity = Math.ceil(totalCount / pageSize);

  return (
    <Stack>
      <Box mb={3}>
        <CreatePost onCreate={refetch} />
      </Box>

      {totalCount ? (
        <Stack alignItems="center" spacing={4}>
          <Grid container>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} md={6} lg={4} xl={3}>
                <Post {...post} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={pagesQuantity}
            color="primary"
            page={page}
            onChange={(event, page) => setPage(page)}
            showFirstButton
            showLastButton
          />
        </Stack>
      ) : (
        <Typography variant="h6" align="center">
          No posts yet.
        </Typography>
      )}
    </Stack>
  );
}
