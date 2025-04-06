const { db } = require('../config/firebase');
const { buildFixedExpense } = require('../models/fixedExpenses.model');
// Obtener metas de un usuario por UID

const createFixedExpense = async (req, res) => {
    try {
      const expenseData = req.body;
      if (!expenseData.uid || !expenseData.amount || !expenseData.description || !expenseData.recurrence) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newExpense = buildFixedExpense(expenseData);
      await db.collection('gastos_fijos').add(newExpense);
      res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ error: 'Failed to create expense' });
    }
  };
  
const getFixedExpensesByUser = async (req, res) => {
    try {
      const uid = req.params.uid;
      const snapshot = await db.collection('gastos_fijos').where('uid', '==', uid).get();
      
      const fixedExpenses = [];
      snapshot.forEach(doc => {
        fixedExpenses.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(fixedExpenses);
    } catch (error) {
      console.error('Error getting goals:', error);
      res.status(500).json({ error: 'Failed to get goals' });
    }
  };

  module.exports = {
    getFixedExpensesByUser,
    createFixedExpense,
  };