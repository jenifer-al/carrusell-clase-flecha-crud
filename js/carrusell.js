// --- 1. REFERENCIAS AL DOM ---
const NOMBRE = document.getElementById("nombre");
const IMAGEN = document.getElementById("imagen");
const DESCRIPCION = document.getElementById("descripcion");
const CARACTERISTICA = document.getElementById("caracteristica");

// --- 2. FUNCIONES DE APOYO ---

const mostrarCiudad = (ciudad) => {
  NOMBRE.textContent = ciudad.nombre;
  IMAGEN.src = `imagenes/${ciudad.imagen}`;
  DESCRIPCION.textContent = ciudad.descripcion;
  CARACTERISTICA.innerHTML = `<ul>${ciudad.caracteristicas.map(c => `<li>${c}</li>`).join('')}</ul>`;
};

// Función BUSCAR independiente (según guías)
const buscar = (nombreCiudad) => {
  return japon.findIndex(c => c.nombre.toLowerCase() === nombreCiudad.toLowerCase());
};

// --- 3. LÓGICA DEL CARRUSEL (Navegación) ---
let indexActual = 0;
let temporizador = null;

const avanzar = () => { indexActual = (indexActual + 1) % japon.length; mostrarCiudad(japon[indexActual]); };
const retroceder = () => { indexActual = (indexActual - 1 + japon.length) % japon.length; mostrarCiudad(japon[indexActual]); };

// --- 4. LÓGICA CRUD ---

// AGREGAR
document.getElementById("agre").addEventListener("click", () => {
  const nombre = prompt("Nombre de la ciudad:");
  if (nombre && buscar(nombre) === -1) {
    const nueva = new Ciudad(nombre, prompt("Descripción:"), prompt("Imagen (archivo):"), prompt("Caract (separadas por coma):").split(","));
    japon.push(nueva);
    alert("Ciudad agregada.");
  } else alert("Error: La ciudad ya existe o nombre inválido.");
});

// DEVOLVER (BUSCAR)
document.getElementById("dev").addEventListener("click", () => {
  const nombre = prompt("¿Qué ciudad quieres buscar?");
  const pos = buscar(nombre);
  if (pos !== -1) { indexActual = pos; mostrarCiudad(japon[pos]); } 
  else alert("No encontrada.");
});

// MODIFICAR
document.getElementById("mod").addEventListener("click", () => {
  const nombre = prompt("Ciudad a modificar:");
  const pos = buscar(nombre);
  if (pos !== -1) {
    japon[pos].descripcion = prompt("Nueva descripción:", japon[pos].descripcion);
    mostrarCiudad(japon[pos]);
  } else alert("No encontrada.");
});

// ELIMINAR
document.getElementById("elim").addEventListener("click", () => {
  const nombre = prompt("Ciudad a eliminar:");
  const pos = buscar(nombre);
  if (pos !== -1) {
    japon.splice(pos, 1);
    alert("Ciudad eliminada.");
    indexActual = 0;
    mostrarCiudad(japon[0]);
  } else alert("No encontrada.");
});

// --- 5. INICIALIZACIÓN Y EVENTOS DE NAVEGACIÓN ---

document.getElementById("avanzar").addEventListener("click", avanzar);
document.getElementById("retroceder").addEventListener("click", retroceder);

document.getElementById("inicio").addEventListener("click", () => {
    indexActual = 0;
    mostrarCiudad(japon[indexActual]);
});

document.getElementById("final").addEventListener("click", () => {
    indexActual = japon.length - 1;
    mostrarCiudad(japon[indexActual]);
});

document.getElementById("auto").addEventListener("click", () => {
    if (temporizador === null) {
        temporizador = setInterval(avanzar, 3000);
    } else {
        clearInterval(temporizador);
        temporizador = null;
    }
});

// Carga inicial
mostrarCiudad(japon[0]);