const readline = require('readline');
const fs = require('fs').promises;
const yargs = require('yargs');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pregunta = (pregunta) => {
    return new Promise((resolve) => rl.question(pregunta, resolve));
};

const argv = yargs
    .option('file', {
        alias: 'f',
        description: 'Nombre del archivo JSON',
        type: 'string',
        default: 'productos.json'
    })
    .argv;

const archivo = argv.file;

const agregarAlArchivo = async (archivo, nuevoProducto) => {

    try {
        await fs.access(archivo);

        const data = await fs.readFile(archivo, 'utf8');
        const productos = JSON.parse(data); 

        productos.push(nuevoProducto); 

        await fs.writeFile(archivo, JSON.stringify(productos, null, 2), 'utf8');
        console.log('Producto agregado exitosamente.');
    } catch (err) {
        const productos = [nuevoProducto];
        await fs.writeFile(archivo, JSON.stringify(productos, null, 2), 'utf8');
        console.log('Archivo creado y producto guardado.');
    }

    const data = await fs.readFile(archivo, 'utf8');
    console.log('Contenido actual del archivo JSON:');
    console.log(JSON.parse(data));
}

const crearProducto = async () => {
    try {
        const produto  = await pregunta('Ingrese nombre de producto: ');
        const precio = await pregunta('Ingrese precio: ');
        const cantidad = await pregunta('Ingrese cantidad: ');

        const nuevoProducto = {
        nombre: produto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad)
        }

        await agregarAlArchivo(archivo, nuevoProducto);
        
        rl.close();
    } catch (error) {
        console.log('error: ', error);
    }
}


crearProducto();
