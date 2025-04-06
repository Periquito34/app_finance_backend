// src/models/goalModel.js

const buildExpense = (data) => {
    return {
      uid: data.uid,
      amount: data.amount,
      description: data.description,
      createdAt: new Date().toISOString()
      
    };
  };
  
  module.exports = { buildExpense };
  