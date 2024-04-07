import { Stack, Typography } from '@mui/material';
import GoBackButton from '@frontend-graphql/ui-kit/GoBackButton';

export default function NotFoundPage() {
  return (
    <Stack>
      <Typography variant="h5">Page Not Found</Typography>

      <GoBackButton />
    </Stack>
  );
}
