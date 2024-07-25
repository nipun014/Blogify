const express = require('express');
require('./connection');
const User = require('./model/user');
const Blog = require('./model/blog');
const Comment = require('./model/comment');

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API Endpoints

// Test endpoint
app.get('/add', (req, res) => res.send('hello'));

// User authentication
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all blogs
app.get('/getblog', async (req, res) => {
  try {
    const blogs = await Blog.find().lean().sort({ createdAt: -1 }).limit(40);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User registration
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Add new user
app.post('/add', async (req, res) => {
  try {
    await User.create(req.body);
    res.send({ message: 'Data added successfully!!!' });
  } catch (error) {
    res.status(500).send({ message: 'Error adding data' });
  }
});

// View all blogs
app.get('/view', async (req, res) => {
  try {
    const data = await Blog.find().lean();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching data' });
  }
});

// Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete a blog by ID
app.delete('/remove/blog/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting blog' });
  }
});

// Delete a user by ID
app.delete('/remove/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user' });
  }
});

// Update a user by ID
app.put('/edit/user/:id', async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    res.send({ message: 'User updated successfully', data });
  } catch (error) {
    res.status(500).send({ message: 'Error updating user' });
  }
});

// Update a blog by ID
app.put('/update/blog/:id', async (req, res) => {
  try {
    const data = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    res.send({ message: 'Blog updated successfully', data });
  } catch (error) {
    res.status(500).send({ message: 'Error updating blog' });
  }
});

// Add new blog
app.post('/addnew', async (req, res) => {
  const { heading, body, image, author } = req.body;
  try {
    const newBlog = new Blog({ heading, body, author, picture: image, date: new Date() });
    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error adding blog', error: error.message });
  }
});

// Get a blog by ID with comments and likes
app.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      })
      .populate('likes', 'username');
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blogs by username
app.get('/blogs/user/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blogs = await Blog.find({ author: user.username }).lean().sort({ createdAt: -1 });
    
    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found for this user' });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
});

// Like a blog post
app.post('/blog/:id/like', async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.body.userId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (!blog.likes.includes(userId)) {
      blog.likes.push(userId);
      await blog.save();
      res.status(200).json({ message: 'Blog post liked', likes: blog.likes.length });
    } else {
      blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
      await blog.save();
      res.status(200).json({ message: 'Like removed', likes: blog.likes.length });
    }
  } catch (error) {
    console.error('Error handling like:', error);
    res.status(500).json({ message: error.message });
  }
});

// Unlike a blog post
app.post('/blog/:id/unlike', async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.body.userId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
      await blog.save();
      res.status(200).json({ message: 'Like removed', likes: blog.likes.length });
    } else {
      res.status(400).json({ message: 'User has not liked this blog post' });
    }
  } catch (error) {
    console.error('Error handling unlike:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a blog post
app.post('/blog/:id/comments', async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ message: 'User ID and content are required' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = new Comment({ content, author: userId });
    await comment.save();

    blog.comments.push(comment._id);
    await blog.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove a comment from a blog post
  app.delete('/blog/:id/comments/:commentId', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      blog.comments = blog.comments.filter(comment => comment.toString() !== req.params.commentId);
      await blog.save();

      await Comment.findByIdAndDelete(req.params.commentId);

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: error.message });
    }
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
