const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// FIXED: MongoDB Connection with correct database name
const MONGODB_URI = "mongodb+srv://sarulathav05:saru@123@cluster0.fscfgit.mongodb.net/nourishco?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const productRoutes = require('./routes/Products');
const orderRoutes = require('./routes/orders');
const commentRoutes = require('./routes/comments');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NourishCo API', status: 'running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
});