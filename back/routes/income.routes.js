const express = require('express');
const router = express.Router();
const { createIncome, getIncomeByUser}= require('../controllers/income.controller');

//Obtener ingresos por UID
router.get('/income/:uid', getIncomeByUser);

// Crear nuevo ingreso
router.post('/income', createIncome);

module.exports = router;