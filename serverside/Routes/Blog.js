const express = require('express');
const router = express.Router();
const Blog = require('../Models/Blog');

// Create a blog post
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const blog = new Blog({ title, content, author });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
  
      await Blog.deleteOne({ _id: req.params.id }); // Changed to deleteOne() for clarity
      res.json({ message: 'Blog post removed' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
