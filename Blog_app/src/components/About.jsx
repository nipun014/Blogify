import * as React from 'react';
import { Typography } from '@mui/material';
import './About.css'; // Ensure this CSS file styles the component appropriately
import Navbar from './Navbar';

function About() {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <div className="heading-background">
        <img src='/src/assets/bg.jpg' alt='background' className="heading-image" />
        <Typography variant='h1' sx={{
          fontFamily: 'Poppins, sans-serif',
          color: '#2c2c34',
          fontSize: '5rem',
          fontWeight: 700,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1, // Ensure the heading text overlays the image
        }}>
          About Blogify
        </Typography>
      </div>
      <div className="content-section">
        <div style={{ padding: '20px' }}>
          <p id='writing'>
            Welcome to Blogify! We are a vibrant platform designed for bloggers to share their thoughts, ideas, and stories with a global audience. Whether you're an avid reader or an enthusiastic writer, Blogify offers a unique space to explore diverse content and express your creativity.
          </p>
          <Typography variant='h2' sx={{
            fontFamily: 'Poppins, sans-serif',
            color: '#2c2c34',
            fontSize: '3rem',
            fontWeight: 700,
          }}>Our Mission</Typography>
          <p id='writing'>
            At Blogify, our mission is to foster a community of passionate individuals who value the art of blogging. We aim to provide a user-friendly platform that encourages the sharing of knowledge, experiences, and perspectives. We believe that everyone has a story to tell, and Blogify is the perfect place to share yours.
          </p>
          <Typography variant='h2' sx={{
            fontFamily: 'Poppins, sans-serif',
            color: '#2c2c34',
            fontSize: '3rem',
            fontWeight: 700,
          }}>Features</Typography>
          <ul id='writing'>
            <li>
              <strong>Read & Explore:</strong> Discover a wide range of blogs from various categories. Whether you're interested in technology, travel, lifestyle, or personal development, there's something for everyone.
            </li>
            <li>
              <strong>Create & Share:</strong> Start your own blog and share your thoughts with the world. Our intuitive editor makes it easy to write, format, and publish your content.
            </li>
            <li>
              <strong>Connect & Engage:</strong> Connect with other bloggers and readers through comments, likes, and shares. Engage in meaningful discussions and build your network.
            </li>
          </ul>
          {/* <Typography variant='h2' sx={{
            fontFamily: 'Poppins, sans-serif',
            color: '#2c2c34',
            fontSize: '3rem',
            fontWeight: 700,
          }}>Our Team</Typography>
          <p id='writing'>
            Blogify is built by a dedicated team of developers, designers, and content creators who are passionate about empowering individuals to share their voices. We are committed to continuously improving the platform and adding new features to enhance your blogging experience.
          </p> */}
          <Typography variant='h2' sx={{
            fontFamily: 'Poppins, sans-serif',
            color: '#2c2c34',
            fontSize: '3rem',
            fontWeight: 700,
          }}>Contact Us</Typography>
          <p id='writing'>
            We value your feedback and are here to help with any questions or concerns you may have. Feel free to reach out to us at <a href="mailto:support@blogify.com">support@blogify.com</a>.
          </p>
        </div>
      </div>
    </div>
    </> 
  );
}

export default About;
