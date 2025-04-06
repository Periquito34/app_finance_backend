const { getAuth } = require('firebase-admin/auth');
const { createUserRecord } = require('../models/user.model');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await getAuth().createUser({
      email,
      password
    });

    // Guardamos en Firestore
    await createUserRecord(userRecord.uid, email);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      uid: userRecord.uid,
      email,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({ error: error.code || 'Error al registrar usuario' });
  }
};

module.exports = {
  registerUser
};
