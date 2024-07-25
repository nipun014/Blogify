import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, TextField } from '@mui/material';
import './NewBlog.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  // Set the author from localStorage when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setAuthor(userId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/addnew', { heading, body, image, author });
      console.log(response.data.message);
      navigate('/old'); // Redirect to user blogs page after update

      // Optionally, clear form fields after successful submission
      setHeading('');
      setBody('');
      setImage('');
      navigate('/old'); // Redirect to user blogs page after update

    } catch (error) {
      console.error('Error adding blog:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit} style={{ 
          backgroundColor: '#d8d8f6', /* Light background */
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '90%', 
          maxWidth: '600px'
        }}>
          <div className="heading">
            <TextField 
              id="heading"
              label="Heading" 
              variant="outlined" 
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  bgcolor: '#d8d8f6', // Light background
                  borderRadius: '0.5rem',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#494850', // Subtle border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#494850',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#494850',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#2c2c34', // Dark text color
                  },
                  '& .MuiFormLabel-root': {
                    color: '#978897', // Placeholder text color
                  },
                },
              }}
            />
          </div>
          <div className="image">
            <TextField 
              id="image"
              label="Image URL" 
              variant="outlined" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  bgcolor: '#d8d8f6', // Light background
                  borderRadius: '0.5rem',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#494850', // Subtle border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#494850',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#494850',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#2c2c34', // Dark text color
                  },
                  '& .MuiFormLabel-root': {
                    color: '#978897', // Placeholder text color
                  },
                },
              }}
            />
          </div>
          <div className="body">
            <TextField 
              id="body"
              label="Body" 
              variant="outlined"
              multiline
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  bgcolor: '#d8d8f6', // Light background
                  borderRadius: '0.5rem',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#494850', // Subtle border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#494850',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#494850',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#2c2c34', // Dark text color
                  },
                  '& .MuiFormLabel-root': {
                    color: '#978897', // Placeholder text color
                  },
                },
              }}
            />
          </div>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{
              bgcolor: '#978897', // Primary button background
              color: '#d8d8f6', // Light text color
              border: '1px solid #494850', // Subtle border
              '&:hover': {
                bgcolor: '#bc8fcf', // Hover background
                color: '#d8d8f6', // Hover text color
              },
              marginTop: '20px', // Spacing below body field
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewBlog;
