import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Login_signup from './Login_signup';
import Avatar2 from './Avatar2';

const pagesWithLinks = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'MyBlogs', link: '/myblogs' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [login, setLogin] = React.useState(() => {
    // Initialize login state from localStorage
    const loggedIn = localStorage.getItem('loggedIn');
    // Convert to boolean
    return loggedIn === 'true'; // true if 'loggedIn' is 'true', false otherwise
  });
  
  console.log('hurray')
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src='/src/assets/blogifylogo.png' alt='Blogify Logo' style={{ marginRight: '10px', height: ' 40px', }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#2c2c34',
              textDecoration: 'none',
            }}
          >
            Blogify
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: '#2c2c34',
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} to='/'>
                <Typography variant="body1">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to='/about'>
                <Typography variant="body1">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to={login ? '/myblogs' : '/login'}>
                <Typography variant="body1">My Blogs</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'space-around' } }}>
            <Button
              key="Home"
              component={Link}
              to="/"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#2c2c34' }}
            >
              Home
            </Button>
            <Button
              key="About"
              component={Link}
              to="/about"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#2c2c34' }}
            >
              About
            </Button>
            <Button
              key="MyBlogs"
              component={Link}
              to={login ? '/myblogs' : '/login'}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#2c2c34' }}
            >
              My Blogs
            </Button>
          </Box>

          {login ? <Avatar2 /> : <Login_signup />}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
