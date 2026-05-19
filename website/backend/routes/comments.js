const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Initial comments data
const initialComments = [
  { name: "Priya S.", avatar: "🌸", text: "The turmeric latte mix is life-changing. I've replaced my morning tea with this — it's warm, grounding, and delicious!", rating: 5, product: "Turmeric Latte Mix", isApproved: true },
  { name: "Arjun M.", avatar: "🌿", text: "Genuinely the best ghee I've ever had. You can taste the difference immediately. Fast delivery too!", rating: 5, product: "Herbal Ghee", isApproved: true },
  { name: "Sneha R.", avatar: "🍃", text: "Love the seed mix ladoos. My kids ask for them every day now — amazing that something so healthy tastes this good.", rating: 4, product: "Seed Mix Ladoo", isApproved: true },
  { name: "Kavya T.", avatar: "🌻", text: "The wild honey is extraordinary. Thick, rich, and nothing like the supermarket stuff. Worth every rupee.", rating: 5, product: "Wild Honey Jar", isApproved: true },
  { name: "Rohan D.", avatar: "🌾", text: "Sprouted granola has completely changed my mornings. Light, filling, and you can feel the quality.", rating: 4, product: "Sprouted Granola", isApproved: true },
];

// Initialize comments if empty
const initializeComments = async () => {
  try {
    const count = await Comment.countDocuments();
    console.log('Existing comments count:', count);
    if (count === 0) {
      for (const comment of initialComments) {
        await Comment.create(comment);
      }
      console.log('✅ Initial comments added to database');
    }
  } catch (error) {
    console.error('Error initializing comments:', error);
  }
};
// Call initialization
initializeComments();

// GET all approved comments (for public)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({ isApproved: true }).sort({ createdAt: -1 });
    console.log(`Found ${comments.length} approved comments`);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET all comments (admin)
router.get('/all', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create comment
router.post('/', async (req, res) => {
  try {
    console.log('Creating comment:', req.body);
    const comment = new Comment(req.body);
    await comment.save();
    console.log('Comment saved:', comment._id);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT approve comment
router.put('/:id/approve', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;