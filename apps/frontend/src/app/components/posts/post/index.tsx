import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Box, Divider, Stack, Typography } from '@mui/material';

import PageWrapper from '@frontend/ui-kit/PageWrapper';

import { getPost } from '@frontend/api/posts';
import { CustomError, IPost } from '@frontend/types';
import parseDate from '@frontend/utils/parseDate';

import DeletePost from '../delete';
import UpdatePost from '../update';

import { environment } from '../../../../environments/environment';
import GoBackButton from '@frontend/ui-kit/GoBackButton';

export default function PostDetails() {
  const { postId = '' } = useParams();

  const { data, isLoading, refetch, error } = useQuery<IPost, CustomError>({
    queryKey: [postId],
    queryFn: () => getPost(postId),
  });

  return (
    <PageWrapper isLoading={isLoading} error={error}>
      <Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <GoBackButton />

          <Stack direction="row">
            <UpdatePost data={data} onSuccess={refetch} />
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
            Created at {parseDate(data?.createdAt || '')} by XXX
            {/* {data?.author?.name} */}
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
    </PageWrapper>
  );
}
