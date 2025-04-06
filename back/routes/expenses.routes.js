const express = require('express');
const router = express.Router();
const { getBillsByUser, createExpense } = require('../controllers/expenses.controller');

// Obtener metas por UID
router.get('/expenses/:uid', getBillsByUser);

// Crear nueva meta
router.post('/expenses', createExpense);

module.exports = router;
