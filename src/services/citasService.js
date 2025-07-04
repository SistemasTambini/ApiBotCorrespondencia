const axios = require('axios');
const client = require('../config/client');
const { generarMensajes, generarMensajeATU } = require('./mensajeService');
const { generarMensajesDerivado } = require('./mensajeService');
const validateNumber = require('../utils/validateNumber');

const verificarCorrespondencia = async () => {
    try {
        console.log("🔍 Obteniendo correspondencias pendientes...");

        // Obtener todas las correspondencias con estado_envio_wp = 0
        const response = await axios.get('http://192.168.1.200:3000/api/correspondencia/');
        const correspondenciasPendientes = response.data.filter((corres) => corres.Estado_envio_wp === 0);

        if (correspondenciasPendientes.length === 0) {
            console.log('✅ No hay correspondencias pendientes de notificación.');
            return;
        }

        for (const correspondencia of correspondenciasPendientes) {
            console.log(`📌 Procesando correspondencia ID: ${correspondencia.id}`);

            if (!correspondencia.telefono) {
                console.log(`⚠️ La correspondencia ID ${correspondencia.id} no tiene un teléfono asociado.`);
                continue;
            }

            // Validar si el número está en WhatsApp
            const numberId = await validateNumber(correspondencia.telefono);
            console.log(`✅ Número validado: ${numberId}`);

            // const numeroRecepcion=await validateNumber(942159342);//aqui va el numero de recepción
            const numeroRecepcion = await validateNumber(998152812);//aqui va el numero de recepción
            console.log(`✅ Número validado de recepcion: ${numeroRecepcion}`);

            if (!numberId) {
                console.log(`❌ El número ${correspondencia.telefono} no está registrado en WhatsApp.`);
                continue;
            }
            if (!numeroRecepcion) {
                console.log(`❌ El número ${998152812} no está registrado en WhatsApp.`);
                continue;
            }

            let mensaje = generarMensajes(correspondencia.Estado, correspondencia.Para);
            let mensajeATU = generarMensajeATU(correspondencia.Estado, correspondencia.id, correspondencia.Para);

            if (!mensaje) {
                console.log(`⚠️ No se generó un mensaje válido para la correspondencia ID: ${correspondencia.id}`);
                continue;
            }


            try {
                const chatExists = await client.getChatById(numberId).catch(() => null);

                if (!chatExists) {
                    console.log(`❌ El número ${correspondencia.telefono} no tiene un chat activo. Saltando...`);
                    continue; // evitar el error de serialize
                }
            
                console.log(`📩 Enviando mensaje a ${correspondencia.telefono}: ${mensaje}`);

                // Enviar mensaje por WhatsApp usuario dinamico
                await client.sendMessage(numberId, mensaje);
                console.log(`✅ Mensaje enviado a ${correspondencia.telefono}`);


                //enviando mensaje por WhatsApp a ATU para el seguimiento correspondiente
                await client.sendMessage(numeroRecepcion, mensajeATU);
                console.log(`✅ Mensaje enviado a recepcion ATU`);


                await axios.post('http://192.168.1.200:3000/api/correspondencia/uptEstadoEnvioWsp', {
                    id: correspondencia.id
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                console.log(`🔄 Estado de la correspondencia ID ${correspondencia.id} actualizado a 1.`);

            } catch (error) {
                console.error(`❌ Error al enviar mensaje a ${correspondencia.telefono}:`, error.message);
            }
        }
    } catch (error) {
        console.error('❌ Error al verificar las correspondencias:', error.message);
    }
};

module.exports = { verificarCorrespondencia };

