import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';

import PageWrapper from '@frontend/ui-kit/PageWrapper';

import { getPosts } from '@frontend/api/posts';
import useAuth from '@frontend/hooks/useAuth';
import { CustomError, IPost, PageableResponse } from '@frontend/types';

import Post from '../card';
import CreatePost from '../create';

import { io } from 'socket.io-client';

export default function PostFeed() {
  const { userId } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch, error } = useQuery<
    PageableResponse<IPost>,
    CustomError
  >({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
  });

  useEffect(() => {
    const socket = io('http://localhost:8080');

    socket.on('posts', ({ action, post }) => {
      const isCurrentUserPost = userId === post.author._id;

      if (action === 'create' && !isCurrentUserPost) refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const posts = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const pageSize = data?.pageSize || 1;

  const pagesQuantity = Math.ceil(totalCount / pageSize);

  return (
    <PageWrapper isLoading={isLoading} error={error}>
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
    </PageWrapper>
  );
}
