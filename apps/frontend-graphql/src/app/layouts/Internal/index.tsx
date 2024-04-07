import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from '../Header';

export default function MainLayout() {
  return (
    <Box width={1}>
      <Header />

      <Container sx={{ p: 3 }} component="main" maxWidth="xl">
        <Outlet />
      </Container>
    </Box>
  );
}
