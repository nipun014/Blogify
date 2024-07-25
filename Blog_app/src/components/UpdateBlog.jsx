import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import './NewBlog.css'; // Import the CSS file
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams hooks

const UpdateBlog = () => {
  const { id } = useParams(); // Get blogId from URL params
  const navigate = useNavigate(); // Initialize navigate hook

  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
        const { heading, body, picture, author } = response.data;
        setHeading(heading);
        setBody(body);
        setImage(picture || ''); // Handle case where picture might be empty
        setAuthor(author);
      } catch (error) {
        console.error('Error fetching blog:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const blogData = {
      heading,
      body,
      picture: image || '', // Send empty string if image is not provided
      author
    };

    try {
      const response = await axios.put(`http://localhost:3000/update/blog/${id}`, blogData);
      console.log('Update successful:', response.data.message);
      // Optionally, clear form fields after successful submission
      setHeading('');
      setBody('');
      setImage('');
      navigate('/old'); // Redirect to user blogs page after update
    } catch (error) {
      console.error('Error updating blog:', error.response ? error.response.data.message : error.message);
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
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
