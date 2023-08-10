const { Post, Blogger } = require('../models');

module.exports = {
  // Get all social media posts
  async getPosts(req, res) {
    try {
      const post = await Post.find();
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a post reaction
  async getSinglePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
        .select('-__v');

      if (!post) {
        return res.status(404).json({ message: 'No posts exist with that user' });
      }

      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a post reaction
  async createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a post reaction
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete( req.params.postId);

      if (!post) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      res.json({ message: 'Thoughts and Bloggers deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a post reaction
  async updatePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'No post with this id!' });
      }

      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
