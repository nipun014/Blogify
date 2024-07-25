import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home1.css';
import Navbar from './Navbar';

const Home1 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/getblog');
        const data = await response.json();
        setBlogs(data.slice(0, 40)); // Fetch the newest 20 blogs
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="heroSection">
        <div className="heroText">
          <Typography variant="h2" component="h1" fontFamily={'Popins, sans-serif'} gutterBottom>
            Welcome to Blogify
          </Typography>
          <Typography variant="h5" fontFamily={'Popins, sans-serif'} component="p">
            Discover the latest and greatest blogs from our community.
          </Typography>
        </div>
      </div>
      <Container className="cardGrid" maxWidth="md">
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={4}>
              <Card className="card">
                <CardMedia
                  className="cardMedia"
                  image={blog.picture}
                  heading={blog.heading}
                />
                <CardContent className="cardContent">
                  <Typography gutterBottom variant="h5" component="h2">
                    {blog.heading}
                  </Typography>
                  <Typography sx={{fontSize:'15px'}} variant='h6'>{blog.author}</Typography>
                  
                </CardContent>
                {/* Use Link component to navigate to blog post */}
                <Button
                  component={Link}
                  to={`/blog/${blog._id}`} // Pass blog ID as part of the URL
                  size="small"
                  color="primary"
                  className="button"
                >
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default Home1;
