import { Box, Button, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '/src/assets/bg-image.jpg'; // Import your background image

const theme = createTheme({
  palette: {
    primary: {
      main: '#494850',
      dark: '#494850',
    },
    background: {
      default: '#978897',
    },
  },
});

const LoginPage = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      alert(response.data.message);
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('userId', response.data.user.username); // Store user ID in local storage
      localStorage.setItem('Id', response.data.user._id); 

      navigate('/'); // Redirect to the homepage on successful login
    } catch (error) {
      alert(error.response ? error.response.data.message : 'Error logging in');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 400,
            height: 550,
            borderRadius: '1.5rem',
            bgcolor: '#d8d8f6',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
            src='/src/assets/blogifylogo.png' 
            alt='Blogify Logo' 
            style={{ 
              height: '80px',
              marginBottom: '20px',
              display: 'block',
            }} 
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#2c2c34',
              marginBottom: '20px',
            }}
          >
            Login
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#2c2c34',
              marginBottom: '10px',
              alignSelf: 'flex-start',
            }}
          >
            User ID
          </Typography>
          <TextField
            id="userId"
            label="Enter your User ID"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '20px', width: '100%' }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              textAlign: 'left',
              fontWeight: 'bold',
              color: '#2c2c34',
              marginBottom: '10px',
              alignSelf: 'flex-start',
            }}
          >
            Password
          </Typography>
          <TextField
            id="password"
            label="Enter your Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '20px', width: '100%' }}
          />

          <Button variant="contained" type="submit" sx={{ width: '30%', mt: 2, bgcolor: '#bc8fcf' }}>
            Login
          </Button>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              textAlign: 'left',
              color: '#2c2c34',
              marginBottom: '10px',
              mt: 2,
            }}
          >
            Do not have an Account yet? <Link to='/signup'>Signup</Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
