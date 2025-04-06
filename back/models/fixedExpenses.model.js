// src/models/goalModel.js

const buildFixedExpense = (data) => {
    return {
      uid: data.uid,
      amount: data.amount,
      description: data.description,
      recurrence: data.recurrence,
      createdAt: new Date().toISOString()
    };
  };
  
  module.exports = { buildFixedExpense };
  