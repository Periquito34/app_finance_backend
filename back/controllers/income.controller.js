const { db } = require('../config/firebase');
const { buildIncome } = require('../models/income.model');

// Obtener metas de un usuario por UID

const createIncome = async (req, res) => {
  try {
    const incomeData = req.body;
    if (!incomeData.uid || !incomeData.amount || !incomeData.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newIncome = buildIncome(incomeData);
    await db.collection('ingresos').add(newIncome);
    res.status(201).json({ message: 'Expense created successfully', income: newIncome });
  } catch (error) {
    console.error('Error creatiIncome:', error);
    res.status(500).json({ error: 'Failed to create Income' });
  }
};

const getIncomeByUser = async (req, res) => {
    try {
      const uid = req.params.uid;
      const snapshot = await db.collection('ingresos').where('uid', '==', uid).get();
      
      const incomes = [];
      snapshot.forEach(doc => {
        incomes.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(incomes);
    } catch (error) {
      console.error('Error getting incomes:', error);
      res.status(500).json({ error: 'Failed to get incomes' });
    }
  };


  module.exports = {
    getIncomeByUser,
    createIncome,
  };