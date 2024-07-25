import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    const nameParts = name.split(' ');

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nameParts.length === 2 
        ? `${nameParts[0][0]}${nameParts[1][0]}` 
        : name[0],  // Use the first letter if it's a single word
    };
}

const Avatar2 = () => {
  const [anchorElUser, setAnchorElUser] = useState(null); // State for menu anchor element
  const navigate = useNavigate();
  const userId=localStorage.getItem('userId')
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget); // Open menu at the current target (IconButton)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null); // Close the menu
  };

  const handleLogout = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('userId', '');
    navigate('/'); // Navigate to the home page before reloading
    location.reload(); // Reload the page
  };


  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {userId ? (
              <Avatar {...stringAvatar(userId)} />
            ) : (
              <Avatar alt="default avatar" src="/static/images/avatar.jpg" />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          id="user-menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
          <Typography variant="body1" ><Link to={'/profile'}  style={{textDecoration: "none" , color: "inherit"}}>Profile</Link></Typography>
          </MenuItem>
          
          {userId === 'Admin' && (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography variant="body1"><Link to={'/admin'}  style={{textDecoration: "none" , color: "inherit"}}>Admin Settings</Link></Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default Avatar2;
