import { PropsWithChildren } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Paper, Stack, Typography, useTheme } from '@mui/material';

interface AuthFormProps extends PropsWithChildren {
  title: string;
}

export default function AuthForm({ title, children }: AuthFormProps) {
  const { breakpoints, spacing } = useTheme();

  return (
    <Paper
      sx={{
        p: 3,
        width: 1,
        [breakpoints.up('md')]: {
          maxWidth: spacing(70),
        },
      }}
    >
      <Stack alignItems="center" mb={3}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Stack>

      {children}
    </Paper>
  );
}
