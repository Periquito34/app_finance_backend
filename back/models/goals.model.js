// src/models/goalModel.js

const buildGoal = (data) => {
    return {
      uid: data.uid,
      name: data.name,
      description: data.description,
      price: data.price,
      createdAt: new Date().toISOString()
      
    };
  };
  
  module.exports = { buildGoal };
  