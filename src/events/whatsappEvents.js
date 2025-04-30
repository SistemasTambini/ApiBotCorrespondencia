const client = require('../config/client');
const { verificarCorrespondencia } = require('../services/citasService');
const qrcode = require('qrcode-terminal');

client.on('qr', (qr) => {
  console.log('Escanea este código QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('El cliente de WhatsApp está listo.');
  setInterval(verificarCorrespondencia, 10000); // Cada 10 segundos
});

client.on('authenticated', () => {
  console.log('Cliente autenticado correctamente.');
});

client.on('auth_failure', (message) => {
  console.error('Error en la autenticación:', message);
});

client.on('disconnected', (reason) => {
  console.log('Cliente desconectado:', reason);
});

module.exports = client;
