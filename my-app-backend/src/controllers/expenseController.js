import prisma from '../utils/prisma.js';

// Create expense
export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    const userId = req.userId; // From auth middleware

    // Validation
    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'Amount, category, and date are required' });
    }

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        note: note || null,
        userId,
      },
    });

    res.status(201).json({
      message: 'Expense created successfully',
      expense,
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: 'Server error creating expense' });
  }
};

// Get expenses with filters and pagination
export const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const { category, startDate, endDate, page = 1, limit = 10 } = req.query;

    // Build filter object
    const where = {
      userId,
    };

    if (category) {
      where.category = category;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Get expenses and total count
    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        skip,
        take,
        orderBy: { date: 'desc' },
      }),
      prisma.expense.count({ where }),
    ]);

    res.json({
      expenses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Server error fetching expenses' });
  }
};

// Get expenses summary by category
export const getExpensesSummary = async (req, res) => {
  try {
    const userId = req.userId;

    const expenses = await prisma.expense.findMany({
      where: { userId },
      select: {
        category: true,
        amount: true,
      },
    });

    // Group by category and sum amounts
    const summary = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});

    res.json(summary);
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ error: 'Server error fetching summary' });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { amount, category, date, note } = req.body;

    // Check if expense exists and belongs to user
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Build update data
    const updateData = {};
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (category !== undefined) updateData.category = category;
    if (date !== undefined) updateData.date = new Date(date);
    if (note !== undefined) updateData.note = note;

    const expense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json({
      message: 'Expense updated successfully',
      expense,
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ error: 'Server error updating expense' });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if expense exists and belongs to user
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await prisma.expense.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ error: 'Server error deleting expense' });
  }
};