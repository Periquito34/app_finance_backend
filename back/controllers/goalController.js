// src/controllers/goalController.js
const { db } = require('../config/firebase');
const { buildGoal } = require('../models/goals.model');
const { addMonths, format } = require('date-fns');

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

const calculateADM = (income, expenses) => {
  const adm = parseFloat(income) - parseFloat(expenses);
  return adm;
};

const getADMByUser = async (req, res) => {
  try {
    const { ingresos, gastos } = req.query;
    if (ingresos === undefined || gastos === undefined) {
      return res.status(400).json({ error: 'Se requieren los parámetros de ingresos y gastos.' });
    }
    const adm = calculateADM(ingresos, gastos);
    res.status(200).json({ adm: adm });
  } catch (error) {
    console.error('Error al calcular el ADM:', error);
    res.status(500).json({ error: 'Error al calcular el ADM' });
  }
};

const calculateFormattedEstimatedDate = (goalAmount, monthlySaving) => {
  if (monthlySaving <= 0) {
    throw new Error('El ahorro mensual debe ser mayor a 0');
  }

  const monthsNeeded = Math.ceil(goalAmount / monthlySaving);
  const today = new Date();

  const estimatedDate = addMonths(today, monthsNeeded);

  return format(estimatedDate, 'dd-MM-yyyy');
};

const getEstimatedDate = async (req, res) => {
  try {
    const { goalAmount, monthlySaving } = req.query;
    if (goalAmount === undefined || monthlySaving === undefined) {
      return res.status(400).json({ error: 'Se requieren los parámetros de cantidad de meta y ahorro mensual.' });
    }
    const estimatedDate = calculateFormattedEstimatedDate(goalAmount, monthlySaving);
    res.status(200).json({ estimatedDate: estimatedDate });
  } catch (error) {
    console.error('Error al calcular la fecha estimada:', error);
    res.status(500).json({ error: 'Error al calcular la fecha estimada' });
  }
};

module.exports = {
  getGoalsByUser,
  createGoal,
  deleteGoal,
  updateGoal,
  getADMByUser,
  getEstimatedDate
};
