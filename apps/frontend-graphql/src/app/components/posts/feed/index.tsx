import { useState } from 'react';

import { QueryKey } from '@tanstack/react-query';

import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';

import PageWrapper from '@frontend-graphql/ui-kit/PageWrapper';

import { useGetPosts } from '@frontend-graphql/api/posts';

import Post from '../card';
import CreatePost from '../create';

export default function PostFeed() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetPosts({
    queryKey: ['posts', page] as QueryKey,
    page,
  });

  const posts = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const pageSize = data?.pageSize || 1;

  const pagesQuantity = Math.ceil(totalCount / pageSize);

  return (
    <PageWrapper isLoading={isLoading} error={error}>
      <Stack>
        <Box mb={3}>
          <CreatePost />
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
