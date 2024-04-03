import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Box, Divider, Stack, Typography } from '@mui/material';

import Loader from '@frontend/ui-kit/Loader';

import { getPost } from '@frontend/api/posts';
import { IPost } from '@frontend/types';
import parseDate from '@frontend/utils/parseDate';

import { environment } from '../../../../environments/environment';

export default function PostDetails() {
  const { postId = '' } = useParams();

  const { data, isLoading, refetch } = useQuery<IPost>({
    queryKey: [postId],
    queryFn: () => getPost(postId),
  });

  if (isLoading) return <Loader />;

  return (
    <Stack>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {data?.title}
      </Typography>

      <Stack spacing={0.5}>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          Created at {parseDate(data?.createdAt || '')} by {data?.author}
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          (updated at {parseDate(data?.updatedAt || '')})
        </Typography>
      </Stack>

      <Divider />

      <Box>
        <Box
          component="img"
          src={`${environment.API_URL}${data?.imageUrl}`}
          sx={{ display: 'block', width: 1, maxWidth: 850, mx: 'auto' }}
        />
      </Box>

      <Typography variant="h6" color="textSecondary" paragraph>
        {data?.content}
      </Typography>
    </Stack>
  );
}
