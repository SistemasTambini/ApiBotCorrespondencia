const formatDate = (fecha) => {
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
    const fechaUTC = new Date(fecha);
    const diaSemana = diasSemana[fechaUTC.getUTCDay()];
    const diaMes = fechaUTC.getUTCDate();
    const mes = meses[fechaUTC.getUTCMonth()];
  
    let horas = fechaUTC.getUTCHours();
    const minutos = String(fechaUTC.getUTCMinutes()).padStart(2, '0');
    const periodo = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12 || 12; // Si es 0, convertir a 12
  
    return `${diaSemana} ${diaMes} de ${mes} a las ${horas}:${minutos} ${periodo}`;
  };
  
  module.exports = formatDate;
  