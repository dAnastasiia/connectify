import { Box, Stack } from '@mui/material';

import CreatePost from '@frontend/components/posts/create';
import Feed from '@frontend/components/posts/feed';

export default function FeedPage() {
  return (
    <Stack>
      <Box>
        <CreatePost />
      </Box>

      <Feed />
    </Stack>
  );
}
