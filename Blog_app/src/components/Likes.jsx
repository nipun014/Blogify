import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Likes = ({ blogId }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${blogId}/likes`);
        setLikes(response.data.likes);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [blogId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/blog/${blogId}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking the blog:', error);
    }
  };

  return (
    <Button onClick={handleLike} variant="contained" color="primary">
      Like ({likes})
    </Button>
  );
};

export default Likes;
