const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');
const { seedDatabase } = require('./controllers/transactionController');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to database
connectDB().then(() => {
	seedDatabase();
});

// Routes
app.use('/api', transactionRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Hello World!, Our server is running');
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
