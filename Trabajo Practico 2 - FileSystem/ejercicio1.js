const fs = require('fs');

try{

    const obtenerFechaHora = () => {
        const fechaActual = new Date();
        return `[${fechaActual.toISOString().replace('T', ' ').split('.')[0]}]`;
    };
    
    const fechaInicio = obtenerFechaHora()
    fs.writeFileSync('archivo.txt' , fechaInicio + '- Inicio programa \n', 'utf8');
    
    const duranteEjecucion = setInterval(() => {
        const fechaEjecutando = obtenerFechaHora()
        fs.appendFileSync('archivo.txt', fechaEjecutando + '- Ejecutando tarea...\n', 'utf-8');
    }, 1000);
    
    setTimeout(() => {
        clearInterval(duranteEjecucion);
        const fechaFin = obtenerFechaHora()
        fs.appendFileSync('archivo.txt', fechaFin + '- Tarea terminada.\n', 'utf8');
    }, 5000);
    
    
} catch (error) {
    console.error('Error:', error);
}


