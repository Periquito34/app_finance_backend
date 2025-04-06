const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const createUserRecord = async (uid, email) => {
  const userRef = db.collection('users').doc(uid);
  await userRef.set({
    email,
    createdAt: new Date().toISOString() // Fecha de registro
  });
};

module.exports = {
  createUserRecord
};
