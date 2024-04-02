import { CircularProgress, Stack } from '@mui/material';

interface LoaderProps {
  isGlobal?: boolean;
}

export default function Loader({ isGlobal = false }: LoaderProps) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ ...(isGlobal && { height: '100vh' }) }}
    >
      <CircularProgress />
    </Stack>
  );
}
