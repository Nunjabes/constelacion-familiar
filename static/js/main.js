const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Datos ejemplo
const estrellas = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    nombre: "Padre",
    fecha: "12/03/1965",
    edad: 60,
    ojos: "Marrones",
    descripcion: "La estrella que guía nuestro sistema."
  }
];

let estrellaSeleccionada = null;

// Dibujar estrellas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  estrellas.forEach(estrella => {
    ctx.beginPath();
    ctx.arc(estrella.x, estrella.y, estrella.radius, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

// Detectar click
canvas.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  estrellas.forEach(estrella => {
    const dx = mouseX - estrella.x;
    const dy = mouseY - estrella.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < estrella.radius) {
      estrellaSeleccionada = estrella;
      mostrarInfo(estrella);
    }
  });
});

function mostrarInfo(datos) {
  const panel = document.getElementById("info-panel");

  document.getElementById("info-nombre").textContent = datos.nombre;
  document.getElementById("info-fecha").textContent = datos.fecha;
  document.getElementById("info-edad").textContent = datos.edad;
  document.getElementById("info-ojos").textContent = datos.ojos;
  document.getElementById("info-descripcion").textContent = datos.descripcion;

  panel.classList.add("active");
}

// Cerrar panel
document.getElementById("cerrar").addEventListener("click", () => {
  const panel = document.getElementById("info-panel");
  panel.classList.remove("active");
});