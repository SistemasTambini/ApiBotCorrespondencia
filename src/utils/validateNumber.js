const client = require('../config/client');

const validateNumber = async (telefono) => {
  const telefonoConPrefijo = `51${telefono}`;
  try {
    const numberId = await client.getNumberId(telefonoConPrefijo);
    if (!numberId) {
      console.error(`El número ${telefonoConPrefijo} no está registrado en WhatsApp.`);
      return null;
    }
    return numberId._serialized;
  } catch (error) {
    console.error(`Error validando número ${telefonoConPrefijo}:`, error.message);
    return null;
  }
};

module.exports = validateNumber;
