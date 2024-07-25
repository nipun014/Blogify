const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  heading: String,
  body: String,
  author: String,
  picture: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
