import { Stack, Typography } from '@mui/material';
import GoBackButton from '../GoBackButton';

interface ErrorMessageProps {
  status: number;
  message?: string;
}

export default function ErrorMessage({ status, message }: ErrorMessageProps) {
  const isServerError = String(status).startsWith('5');

  const errorTitle = isServerError
    ? `${status} Server Error`
    : `${status} Error`;

  return (
    <Stack alignItems="center">
      <Typography variant="subtitle1">{errorTitle}</Typography>
      <Typography variant="body2">
        {message || 'Something went wrong, please try again later'}
      </Typography>

      <GoBackButton />
    </Stack>
  );
}
