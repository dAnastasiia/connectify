import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import { Routes } from '@frontend/constants/Routes';

import { Page } from './helpers';
import UserMenu from './model/UserMenu';

const { home, feed, posts } = Routes;

const pages: Page[] = [
  { name: 'Home', href: home.baseRoutes.URL },
  { name: 'Feed', href: `${feed.baseRoutes.URL}/${posts.baseRoutes.URL}` },
];

export default function Header() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onNavMenuItemClick = (href: string) => {
    navigate(href);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ px: 3 }}>
        <Toolbar disableGutters>
          {/* Small screens navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ name, href }) => (
                <MenuItem key={href} onClick={() => onNavMenuItemClick(href)}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Big screens navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                sx={{
                  my: 2,
                  mr: 2,
                  color: 'white',
                  display: 'block',
                  textDecoration: 'none !important',
                }}
              >
                {name}
              </Link>
            ))}
          </Box>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
