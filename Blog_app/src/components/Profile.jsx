import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography, Container, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import bgImage from '/src/assets/bg-image.jpg'; // Import your background image

// Function to generate color based on string
function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

// Function to create Avatar props based on name
function stringAvatar(name) {
    const nameParts = name.split(' ');
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: nameParts.length === 2 
            ? `${nameParts[0][0]}${nameParts[1][0]}` 
            : name[0], // Use the first letter if it's a single word
    };
}

// Styled components
const ContainerStyled = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
}));

// Profile Component
const Profile = () => {
    const userId = localStorage.getItem('userId');
    const avatarProps = stringAvatar(userId);

    return (
        <div>
            <Navbar />
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
                height: '100vh',
                backgroundImage: `url(${bgImage})`, // Background image
                backgroundSize: 'cover', // Cover the background
                backgroundPosition: 'center', // Center the background image
                padding: '20px',
            }}
        >
            
            <ContainerStyled>
                <AvatarStyled {...avatarProps} />
                <PaperStyled elevation={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {userId}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" 
                    sx={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '10vh',
                
                padding: '20px',}}>
                        Welcome to Blogify, {userId}!
                    </Typography>
                </PaperStyled>
            </ContainerStyled>
        </Box>
        </div>
    );
}

export default Profile;
