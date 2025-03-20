const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "contactos.json");

function agregarContacto(nombre, telefono, email) {
  let contactos = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    contactos = JSON.parse(data);
  }

  const nuevoContacto = { nombre, telefono, email };

  contactos.push(nuevoContacto);
  fs.writeFileSync(filePath, JSON.stringify(contactos, null, 2), "utf8");

  console.log("Contacto agregado: ", nombre);
}

function mostrarContactos() {
  if (!fs.existsSync(filePath)) {
    console.log("No hay contacos almacenados.");
    return;
  }

  const data = fs.readFileSync(filePath, "utf8");
  const contactos = JSON.parse(data);

  contactos.forEach((contacto, index) => {
    console.log(
      `${index + 1}. ${contacto.nombre} - ${contacto.telefono} - ${
        contacto.email
      }`
    );
  });
}

function eliminarContacto(nombre) {
  if (!fs.existsSync(filePath)) {
    console.log("El archivo de contactos no existe.");
    return;
  }

  let data = fs.readFileSync(filePath, "utf8").trim();

  if (!data) {
    console.log("El archivo está vacío. No hay contactos para eliminar.");
    return;
  }

  let contactos;

  contactos = JSON.parse(data);

  const nuevosContactos = contactos.filter(
    (contacto) => contacto.nombre !== nombre
  );

  if (nuevosContactos.length === contactos.length) {
    console.log(`No se encontró ningún contacto con el nombre '${nombre}'.`);
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(nuevosContactos, null, 2), "utf8");
  console.log(`El contacto '${nombre}' ha sido eliminado correctamente.`);
}

// Código de prueba

mostrarContactos();
agregarContacto("Joaquin Parellada", "0987-654-321", "joaquin@parellada.com");
mostrarContactos();
agregarContacto("Juanceto001", "1234-567-890", "juacento@gmail.com");
mostrarContactos();
eliminarContacto("Juanceto001");
