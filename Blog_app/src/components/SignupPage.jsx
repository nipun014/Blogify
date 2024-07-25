import { Box, TextField, ThemeProvider, Typography, createTheme, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '/src/assets/bg-image2.jpg'; // Import your background image

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

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/signup', { username, password });
      alert(response.data.message);
      navigate('/login'); // Redirect to the login page on successful signup
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Error signing up');
      }
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
            Sign Up
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
            id="username"
            label="Enter your User ID"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '20px', width: '100%' }}
            required
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
            required
          />
          <Button variant="contained" type="submit" sx={{ width: '30%', mt: 2, bgcolor: '#bc8fcf' }}>
            Sign Up
          </Button>
          {error && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'red',
                mt: 2,
              }}
            >
              {error}
            </Typography>
          )}
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
            Already have an Account? <Link to='/login'>Login</Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignupPage;
