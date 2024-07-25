import React from 'react';
import './MyBlogs.css'; // Import the CSS file
import Navbar from './Navbar';
import { Typography } from '@mui/material';

const MyBlogs = () => {
  // Function to handle panel click
  const panelClickHandler = (url) => {
    window.location.href = url; // Redirect to specified URL
  };

  return (
    <div className="root-container">
      <Navbar />
      <div className="content-container">
        {/* Left Panel */}
        <div className="panel left" onClick={() => panelClickHandler('/new')} >
          <div className="content">
            <Typography variant="h2" sx={{
              fontFamily: 'Poppins, sans-serif',
              color: '#978897',
              fontSize: '3rem',
              fontWeight: 700,
            }}>
              Create New Blog
            </Typography>
          </div>
        </div>

        {/* Right Panel */}
        <div className="panel right" onClick={() => panelClickHandler('/old')}>
          <div className="content">
            <Typography variant="h2" sx={{
              fontFamily: 'Poppins, sans-serif',
              color: '#978897',
              fontSize: '3rem',
              fontWeight: 700,
            }}>
              View Old Blogs
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
