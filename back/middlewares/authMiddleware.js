// authMiddleware.js
const { admin } = require('../config/firebase'); // Ajusta la ruta si es necesario

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token received');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  console.log('🔐 Token recibido:', idToken);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('✅ Usuario autenticado:', decodedToken.uid);
    req.user = decodedToken; // Esto incluye uid, email, etc.
    next(); // Continua al controlador
  } catch (error) {
    console.error('❌ Error al verificar el token:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verifyFirebaseToken;
