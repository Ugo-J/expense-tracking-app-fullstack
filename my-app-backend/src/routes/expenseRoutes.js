import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import {
  createExpense,
  getExpenses,
  getExpensesSummary,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/summary', getExpensesSummary);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;