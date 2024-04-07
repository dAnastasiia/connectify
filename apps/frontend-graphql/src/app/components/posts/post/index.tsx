import { useContext } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';

import GoBackButton from '@frontend-graphql/ui-kit/GoBackButton';

import { PostContext } from '@frontend-graphql/contexts/PostContext';
import parseDate from '@frontend-graphql/utils/parseDate';

import DeletePost from '../delete';
import UpdatePost from '../update';

import { environment } from '../../../../environments/environment';

export default function PostDetails() {
  const { data } = useContext(PostContext);

  return (
    <Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <GoBackButton />

        <Stack direction="row">
          <UpdatePost />
          <DeletePost />
        </Stack>
      </Stack>

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
          {`Created at ${parseDate(data?.createdAt || '')} by  ${
            data?.author?.name
          }`}
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
