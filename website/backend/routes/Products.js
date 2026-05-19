const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Initial products data
const initialProducts = [
  { id: 1, name: "Wild Honey Jar", price: 349, category: "Sweeteners", image: "🍯", badge: "Bestseller", desc: "Raw, unfiltered forest honey packed with antioxidants and natural enzymes.", rating: 4.9, reviews: 128 },
  { id: 2, name: "Sprouted Granola", price: 249, category: "Breakfast", image: "🌾", badge: "New", desc: "Slow-baked oats with seeds, coconut flakes and a hint of cinnamon.", rating: 4.7, reviews: 94 },
  { id: 3, name: "Herbal Ghee", price: 499, category: "Dairy", image: "🧈", badge: "Organic", desc: "A2 cow ghee infused with tulsi and moringa for everyday wellness.", rating: 4.8, reviews: 212 },
  { id: 4, name: "Seed Mix Ladoo", price: 199, category: "Snacks", image: "🟤", badge: "Sugarfree", desc: "Handcrafted energy balls made with jaggery, flax, chia & hemp seeds.", rating: 4.6, reviews: 76 },
  { id: 5, name: "Cold-Press Coconut Oil", price: 389, category: "Oils", image: "🥥", badge: "Organic", desc: "Single-origin, cold-pressed coconut oil — pure, fragrant, zero additives.", rating: 4.9, reviews: 183 },
  { id: 6, name: "Turmeric Latte Mix", price: 299, category: "Beverages", image: "🌿", badge: "Bestseller", desc: "Golden milk blend with ashwagandha, ginger, black pepper & cinnamon.", rating: 4.8, reviews: 156 },
  { id: 7, name: "Millet Cookies", price: 179, category: "Snacks", image: "🍪", badge: "Vegan", desc: "Crunchy cookies made with ragi, jowar and oats. No maida, no refined sugar.", rating: 4.5, reviews: 61 },
  { id: 8, name: "Dried Berry Mix", price: 429, category: "Dry Fruits", image: "🫐", badge: "Superfood", desc: "Hand-picked blend of amla, cranberry, mulberry and goji berries.", rating: 4.7, reviews: 99 },
];

// Initialize products if empty
const initializeProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    for (const product of initialProducts) {
      await Product.create(product);
    }
    console.log('✅ Initial products added to database');
  }
};
initializeProducts();

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create product (admin)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;