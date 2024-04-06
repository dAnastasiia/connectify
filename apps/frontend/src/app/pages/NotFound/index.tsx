import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack, Typography } from '@mui/material';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Stack>
      <Typography variant="h5">Page Not Found</Typography>

      <Button
        variant="text"
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
    </Stack>
  );
}
