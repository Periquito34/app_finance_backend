// src/controllers/userProfileController.js
const { db } = require('../config/firebase');
const { buildUserProfile } = require('../models/userProfileModel');

const saveUserProfile = async (req, res) => {
  const uid = req.body.uid;
  const data = req.body;

  try {
    const userRef = db.collection('users').doc(uid);
    const userProfile = buildUserProfile({ photoURL: data.photoURL }, data);

    await userRef.set(userProfile, { merge: true });

    res.status(200).json({ message: 'Profile saved successfully', userProfile });
  } catch (error) {
    console.error('Error saving user profile:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
};

const updateUserProfile = async (req, res) => {
  const { uid, ...data } = req.body; // Extraemos el uid y los demás datos del cuerpo

  try {
    const userRef = db.collection('users').doc(uid); // Referencia al documento del usuario en Firestore

    // Verificar si el documento existe
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Construir el nuevo perfil
    const userProfile = buildUserProfile({ photoURL: data.photoURL }, data);

    // Actualizar los datos del perfil del usuario en Firestore
    await userRef.update(userProfile);

    res.status(200).json({ message: 'Perfil actualizado correctamente', userProfile });
  } catch (error) {
    console.error('Error actualizando el perfil del usuario:', error);
    res.status(500).json({ error: 'No se pudo actualizar el perfil.' });
  }
};

module.exports = { saveUserProfile, updateUserProfile };
