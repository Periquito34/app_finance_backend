// src/controllers/goalController.js
const { db } = require('../config/firebase');
const { buildGoal } = require('../models/goals.model');

// Crear una nueva meta
const createGoal = async (req, res) => {
  try {
    const goalData = req.body;
    if (!goalData.uid || !goalData.name || !goalData.description || !goalData.price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newGoal = buildGoal(goalData);
    await db.collection('metas').add(newGoal);
    res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

// Obtener metas de un usuario por UID
const getGoalsByUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const snapshot = await db.collection('metas').where('uid', '==', uid).get();
    
    const goals = [];
    snapshot.forEach(doc => {
      goals.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error('Error getting goals:', error);
    res.status(500).json({ error: 'Failed to get goals' });
  }
};


const deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('metas').doc(id).delete();
    res.status(200).json({ message: 'Goal deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateGoal = async (req, res) => {
  const goalId = req.params.id; // Obtén el ID de la meta desde la URL
  const { name, description, price } = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

  try {
    const goalRef = db.collection('metas').doc(goalId); // Referencia al documento de la meta

    // Actualiza el documento con los nuevos datos
    await goalRef.update({
      name,
      description,
      price,
    });

    res.status(200).json({
      message: "Meta actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la meta: ", error);
    res.status(500).json({
      message: "Error al actualizar la meta",
      error: error.message,
    });
  }
};

module.exports = {
  getGoalsByUser,
  createGoal,
  deleteGoal,
  updateGoal
};
