import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography, Container, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import bgImage from '/src/assets/bg-image.jpg'; // Import your background image

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

const ContainerStyled = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginBottom: theme.spacing(2),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
}));

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const avatarProps = stringAvatar(userId);

    return (
        <>
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#978897', // Set the background color
          backgroundImage: `url(${bgImage})`, // Set the background image
          backgroundSize: 'cover', // Ensure the image covers the background
          backgroundPosition: 'center', // Center the image
        }}
      >
        <Navbar/>
        <ContainerStyled>
            <AvatarStyled {...avatarProps} />
            <PaperStyled elevation={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {userId}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Welcome to blogify {userId}
                </Typography>
            </PaperStyled>
        </ContainerStyled>
        </Box>
        </>
        
    );
}

export default Profile;
