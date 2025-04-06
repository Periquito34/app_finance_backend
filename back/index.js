const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const registerRoutes = require('./routes/register.routes'); // Si necesitas rutas de autenticación
const userSetUpRoutes = require('./routes/userProfile.routes'); // Si necesitas rutas de configuración de usuario
const userRoutes = require('./routes/user.routes'); // Si necesitas rutas de usuarios
const goalRoutes = require('./routes/goal.routes');
const expensesRoutes = require('./routes/expenses.routes'); // Si necesitas rutas de gastos
const fixedExpensesRoutes = require('./routes/fixedExpenses.routes'); // Si necesitas rutas de gastos fijos


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Prefijo para rutas de gastos
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Si necesitas rutas de usuarios
app.use('/api/', registerRoutes); // Si necesitas rutas de autenticación
app.use('/api/userSetup', userSetUpRoutes); // Si necesitas rutas de configuración de usuario
app.use('/api/', goalRoutes);
app.use('/api/', expensesRoutes); // Si necesitas rutas de gastos
app.use('/api/', fixedExpensesRoutes); // Si necesitas rutas de gastos fijos


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde Express modularizado 🎯' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
