import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';
import bgImage from '/src/assets/bg-image.jpg';
import { useNavigate } from 'react-router-dom';

const AdminSet = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [deleteBlogDialogOpen, setDeleteBlogDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [deleteBlogId, setDeleteBlogId] = useState('');
  const adminUsername = 'Admin'; // Replace with actual admin identification logic

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data.message : error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchBlogsByUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/blogs/user/${selectedUser}`);
          setBlogs(response.data);
        } catch (error) {
          console.error('Error fetching blogs:', error.response ? error.response.data.message : error.message);
        }
      };

      fetchBlogsByUser();
    }
  }, [selectedUser]);

  const handleUserClick = (username) => {
    setSelectedUser(username);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3000/remove/user/${deleteUserId}`);
      setUsers(users.filter(user => user._id !== deleteUserId));
      setDeleteUserDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data.message : error.message);
    }
  };

  const handleDeleteBlog = async () => {
    if (!deleteBlogId) {
      console.error('Error: Blog ID is not set.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/remove/blog/${deleteBlogId}`);
      setBlogs(blogs.filter(blog => blog._id !== deleteBlogId));
      setDeleteBlogDialogOpen(false);
    } catch (error) {
      console.error('Error deleting blog:', error.response ? error.response.data.message : error.message);
    }
  };

  const handleOpenDeleteUserDialog = (userId) => {
    setDeleteUserId(userId);
    setDeleteUserDialogOpen(true);
  };

  const handleOpenDeleteBlogDialog = (blogId) => {
    setDeleteBlogId(blogId);
    setDeleteBlogDialogOpen(true);
  };

  const handleCloseDeleteUserDialog = () => {
    setDeleteUserDialogOpen(false);
  };

  const handleCloseDeleteBlogDialog = () => {
    setDeleteBlogDialogOpen(false);
  };

  const handleReadBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#978897',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <Box
          component="div"
          sx={{
            width: 900,
            height: 'auto',
            borderRadius: '1.5rem',
            bgcolor: '#d8d8f6',
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#2c2c34' }}>Admin Settings</Typography>

          <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: '#2c2c34' }}>Manage Users</Typography>
          <Box
            sx={{
              maxHeight: 250,
              overflowY: 'auto',
              width: '100%',
            }}
          >
            <Grid container spacing={3}>
              {users.map(user => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                  <Card sx={{ maxWidth: 345, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', fontFamily: 'Poppins, sans-serif' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ color: '#494850' }}>
                        {user.username}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleUserClick(user.username)}
                        sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' }, fontFamily: 'Poppins, sans-serif' }}
                      >
                        Show Blogs
                      </Button>
                      {user.username !== adminUsername && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDeleteUserDialog(user._id)}
                          sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' }, fontFamily: 'Poppins, sans-serif' }}
                        >
                          Delete User
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {selectedUser && (
            <>
              <Typography variant="h5" gutterBottom style={{ marginTop: '20px', color: '#2c2c34' }}>Blogs by {selectedUser}</Typography>
              <Box
                sx={{
                  maxHeight: 400,
                  overflowY: 'auto',
                  width: '100%',
                }}
              >
                <Grid container spacing={3}>
                  {blogs.map(blog => (
                    <Grid item xs={12} sm={6} md={4} key={blog._id}  >
                      
                      <Card sx={{ maxWidth: 345, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', fontFamily: 'Poppins, sans-serif' }}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#494850' }}>
                            {blog.heading}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleReadBlog(blog._id)}
                            sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' }, fontFamily: 'Poppins, sans-serif' }}
                          >
                            Read
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDeleteBlogDialog(blog._id)}
                            sx={{ bgcolor: '#978897', color: '#d8d8f6', '&:hover': { bgcolor: '#bc8fcf' }, fontFamily: 'Poppins, sans-serif' }}
                          >
                            Delete Blog
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}

          {/* Delete User Confirmation Dialog */}
          <Dialog
            open={deleteUserDialogOpen}
            onClose={handleCloseDeleteUserDialog}
            aria-labelledby="delete-user-dialog-title"
            aria-describedby="delete-user-dialog-description"
          >
            <DialogTitle id="delete-user-dialog-title" sx={{ fontFamily: 'Poppins, sans-serif' }}>Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-user-dialog-description" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteUserDialog} color="primary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Cancel
              </Button>
              <Button onClick={handleDeleteUser} color="secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Blog Confirmation Dialog */}
           <Dialog
            open={deleteBlogDialogOpen}
            onClose={handleCloseDeleteBlogDialog}
            aria-labelledby="delete-blog-dialog-title"
            aria-describedby="delete-blog-dialog-description"
          >
            <DialogTitle id="delete-blog-dialog-title" sx={{ fontFamily: 'Poppins, sans-serif' }}>Delete Blog</DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-blog-dialog-description" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Are you sure you want to delete this blog? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteBlogDialog} color="primary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Cancel
              </Button>
              <Button onClick={handleDeleteBlog} color="secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
};

export default AdminSet;

