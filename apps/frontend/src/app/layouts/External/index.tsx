import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

export default function ExternalLayout() {
  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Outlet />
    </Container>
  );
}
