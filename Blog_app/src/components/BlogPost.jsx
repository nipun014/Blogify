import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, Card, CardContent, CardMedia, Button, Box,
  List, ListItem, TextField, IconButton, Avatar, Divider
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';
import bgImage from '/src/assets/bg-image2.jpg';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
        setBlog(response.data);
        setComments(response.data.comments);
        setLikes(response.data.likes.length);
        setLikedByUser(response.data.likedByUser); // Assuming this is part of the response
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Blog URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy the blog URL:', error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) {
      alert('Comment cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/blog/${id}/comments`, {
        content: newComment,
        userId: localStorage.getItem('Id') // Replace with actual user ID
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/blog/${id}/like`, {
        userId: localStorage.getItem('Id') // Replace with actual user ID
      });
      if (response.data.message === 'Blog post liked') {
        setLikes(likes + 1);
        setLikedByUser(true);
      } else if (response.data.message === 'Like removed') {
        setLikes(likes - 1);
        setLikedByUser(false);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/blog/${id}/comments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!blog) {
    return (
      <Container>
        <Navbar />
        <Typography variant="h5" component="p">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#978897',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '56px',
        }}
      >
        <Container>
          <Card sx={{ maxWidth: 1000, margin: 'auto', marginTop: 5 }}>
            <CardMedia
              component="img"
              height="400"
              image={blog.picture || 'https://picsum.photos/seed/default/800/600'}
              alt={blog.heading}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {blog.heading}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {blog.body}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mt={2}>
                By {blog.author || 'Author'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  <IconButton onClick={handleLike}>
                    <ThumbUpAltIcon color={likedByUser ? 'primary' : 'action'} />
                    <Typography variant="body2" ml={1}>{likes}</Typography>
                  </IconButton>
                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box mt={4}>
                <Typography variant="h6">Comments</Typography>
                <List>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <ListItem alignItems="flex-start" key={comment._id}>
                        <Avatar alt={comment.author.username} src="/static/images/avatar/1.jpg" />
                        <Box ml={2}>
                          <Typography variant="body2" color="text.primary">
                            <strong>{comment.author.username}</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {comment.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(comment.createdAt).toLocaleTimeString()}
                          </Typography>
                        </Box>
                        
                        {userId === 'Admin' && (
                          <Box>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          </Box>
                        )}
                        
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No comments yet.
                    </Typography>
                  )}
                </List>
              </Box>
              <Box mt={4}>
                <Typography variant="h6">Add a Comment</Typography>
                <form onSubmit={handleCommentSubmit}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      value={newComment}
                      onChange={handleCommentChange}
                      label="Your Comment"
                      multiline
                      rows={1}
                      fullWidth
                      variant="outlined"
                      sx={{ mb: 2, flexGrow: 1 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ height: 'fit-content', marginLeft: 1, width: '100px', background: "#c0b9d8" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost;
