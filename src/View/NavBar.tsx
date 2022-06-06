import React from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/img/headerLogo.png';
import profile from '../assets/img/profile.png';
import { useUserAuth } from '../Context/UserAuthContext';

interface onjType {
  pages: { id: string; name: string; link: string };
}

const pages = [
  { id: '0', name: 'Dashboard', link: '/dashboard' },
  { id: '1', name: 'Menus', link: '/' },
  { id: '2', name: 'Orders', link: '/orders' },
  { id: '3', name: 'Restaurant List', link: '/restaurant-list' },
];

const theme = createTheme({
  palette: {
    primary: { main: '#DF201F' },
  },
});

const objPages: onjType['pages'][] = [];
for (const key in pages) {
  objPages.push({
    id: `${key}`,
    name: pages[key].name,
    link: pages[key].link,
  });
}

const NavBar = () => {
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const ctx = useUserAuth();
  const logout = ctx?.logout;

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position='static'
        sx={{
          backgroundColor: 'white',
          boxShadow: '2px 2px 30px 2px #FFF3E5',
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            {/* Logo */}
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            >
              <img
                src={logo}
                alt='logo'
                style={{
                  maxWidth: '40px',
                }}
              />
            </Box>
            {/* Logo Text */}
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{
                ml: 2,
                display: {
                  xs: 'none',
                  md: 'flex',
                  color: '#000',
                },
                fontWeight: 700,
              }}
            >
              Food Delivery
            </Typography>
            {/* Responsive Menu Button */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                sx={{
                  color: '#000',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
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
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {objPages.map((page) => (
                  <Link
                    to={page.link}
                    style={{ textDecoration: 'none' }}
                    key={page.id}
                  >
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      sx={{
                        fontWeight: 600,
                        fontFamily: 'Bai Jamjuree',
                        color: '#000',
                      }}
                    >
                      <Typography textAlign='center'>{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 2, display: { xs: 'flex', md: 'none' } }}
            >
              Food Delivery
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              <Tabs
                value={location.pathname}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#DF201F',
                    margin: 5,
                  },
                }}
                textColor='primary'
                sx={{ my: 2 }}
              >
                {objPages.map((page) => (
                  <Tab
                    value={`${page.link}`}
                    label={`${page.name}`}
                    component={Link}
                    to={`${page.link}`}
                    key={page.id}
                    sx={{ color: 'black', mx: 5 }}
                  />
                ))}
              </Tabs>
            </Box>

            {/* USER ICON */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ px: 2 }}>
                  <Avatar alt='Remy Sharp' src={profile} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign='center'
                    component='span'
                    onClick={logout}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open Notification'>
                <IconButton sx={{ px: 2 }}>
                  <Badge badgeContent={'10+'} color='primary'>
                    <NotificationsNoneIcon
                      sx={{ fontSize: 28, color: 'black' }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavBar;
