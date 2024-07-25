import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia, CardActions, Button, Grid } from '@mui/material';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchBlogs = async () => {
      const userId = localStorage.getItem('userId');

      try {
        const response = await axios.post('http://localhost:3000/userblogs', { userId });
        console.log('Fetched blogs:', response.data); // Log fetched data
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:3000/remove/${blogId}`);
      setBlogs(blogs.filter(blog => blog._id !== blogId));
      console.log(`Blog ${blogId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting blog:', error.response ? error.response.data.message : error.message);
    }
  };

  const handleUpdate = async (blogId) => {
    try {
      const response = await axios.get(`http://localhost:3000/blog/${blogId}`);
      const blogData = response.data;
  
      // Redirect to update blog page with pre-filled data
      navigate(`/update/${blogId}`, { state: { blogData } });
    } catch (error) {
      console.error('Error fetching blog for update:', error.response ? error.response.data.message : error.message);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', backgroundColor: '#c0b9d8' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#494850' }}>My Blogs</Typography>
        {blogs.length > 0 ? (
          <Grid container spacing={3}>
            {blogs.map(blog => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Card sx={{ maxWidth: 345, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.picture}
                    alt={blog.heading}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ color: '#494850' }}>
                      {blog.heading}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.body.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/blog/${blog._id}`}
                      sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' } }}
                    >
                      Read 
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleUpdate(blog._id)}
                      sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' } }}
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleDelete(blog._id)}
                      sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' } }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" style={{ color: '#2c2c34' }}>No blogs found</Typography>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
