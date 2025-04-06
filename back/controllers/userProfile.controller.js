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

module.exports = { saveUserProfile };
