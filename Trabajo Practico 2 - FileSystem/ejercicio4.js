const fs = require("fs");
const path = require("path");

if (process.argv.length < 4) {
  console.log("Uso: node contadorPalabras.js <archivo> <palabra>");
  process.exit(1);
}

const archivo = process.argv[2];
const palabra = process.argv[3].toLowerCase();

const filePath = path.join(__dirname, archivo);

try {
  const contenido = fs.readFileSync(filePath, "utf8");
  const palabras = contenido.toLowerCase().match(/\b\w+\b/g);
  const cantidad = palabras.filter((word) => word === palabra).length;

  console.log(
    `La palabra "${palabra}" aparece ${cantidad} veces en el archivo "${archivo}".`
  );
} catch (error) {
  console.error("Error al leer el archivo:", error.message);
}
