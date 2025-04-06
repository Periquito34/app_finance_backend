const { db } = require('../config/firebase');
const { buildExpense } = require('../models/expenses.model');

// Obtener metas de un usuario por UID

const createExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    if (!expenseData.uid || !expenseData.amount || !expenseData.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newExpense = buildExpense(expenseData);
    await db.collection('gastos').add(newExpense);
    res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

const getBillsByUser = async (req, res) => {
    try {
      const uid = req.params.uid;
      const snapshot = await db.collection('gastos').where('uid', '==', uid).get();
      
      const expenses = [];
      snapshot.forEach(doc => {
        expenses.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Error getting goals:', error);
      res.status(500).json({ error: 'Failed to get goals' });
    }
  };


  module.exports = {
    getBillsByUser,
    createExpense,
  };