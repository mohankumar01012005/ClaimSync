const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const claimRoutes = require('./routes/claimRoutes');
// const authRoutes = require('./routes/authRoutes');
const authRoutes = require("./routes/authRoutes")
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// ✅ Serve Static Files (For Uploaded Documents)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/auth', authRoutes);
app.use('/api/claims', claimRoutes);

// ✅ Test API Route
app.get('/', (req, res) => {
  res.send('🚀 Hello World from Claims Management Platform');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
