const fs = require('fs');


try {
    const obtenerFechaHora = () => {
        const fechaActual = new Date();
        return `[${fechaActual.toISOString().replace('T', ' ').split('.')[0]}]`;
    };
    
    const datos = fs.readFileSync('datos.txt', 'utf8')
    console.log(datos);

    const fechaActual = obtenerFechaHora()
    fs.appendFileSync('datos.txt','\nFecha de modificacion: ' + fechaActual, 'utf8');

    fs.renameSync('datos.txt', 'informacion.txt');

    setTimeout(() => {
        fs.unlinkSync('informacion.txt');
    }, 10000);
} catch (error) {
    console.error('Error:', error);
}

