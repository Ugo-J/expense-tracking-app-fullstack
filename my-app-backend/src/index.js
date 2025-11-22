import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running!' });
});

// Start server
app.listen(PORT, () => {
  // console.log(process.env.PORT);
  console.log(`Server is running on port ${PORT}`);
});