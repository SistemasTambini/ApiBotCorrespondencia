
const generarMensajes = (Estado, Para) => {
    let mensaje = "";

    switch (Estado) {
        case 1:
            mensaje = `*¡Hola ${Para}!* 📦\nTienes una correspondencia registrada con éxito. ✅`;
            break;
        case 2:
            mensaje = `*¡Hola, Sr(a) ${Para}!*\nEl estado de tu correspondencia cambió a *Entregado* 📩`;
            break;
        case 3:
            mensaje = `*¡Hola, Sr(a) ${Para}!*\nte *derivaron* una correspondencia 📜`;
            break;
        case 4:
            mensaje = `*¡Hola, Sr(a) ${Para}!*\ntu correspondencia a *Finalizado*, el documento ha sido entregado ✅`;
            break;
        default:
            mensaje = `*Hola ${Para}!* 📢\nNo hay cambios en el estado de tu correspondencia.`;
    }

    return mensaje.trim();
};


//Mensaje para avisar a ATU
const generarMensajeATU = (Estado, id, Para) => {
    let MensajeATU = "";

    if (Estado === 1) {
        MensajeATU = `*¡Hola, ATU!*\nHay una correspondencia registrada con el N° ${id}, para el usuario ${Para}`;
    } else if (Estado === 4) {
        MensajeATU =  `*¡Hola, ATU!*\nLa correspondencia con el N° ${id}, del usuario ${Para}, ha finalizado`;
    } else {
        return null;
    }

    return MensajeATU;
};



// Avisa al usuario anterior que su correspondencia fue derivada
const generarMensajesDerivado = (Estado, Para) => {
    return `*¡Hola, Sr(a) ${Para}!*\nTu correspondencia fue derivada a otro usuario. 📜 [TEST BOT TAMBINI]`;
};


module.exports = { generarMensajes,generarMensajeATU,generarMensajesDerivado };
