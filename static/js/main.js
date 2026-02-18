const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generar estrellas una sola vez
const stars = [];
for (let i=0; i<150; i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2,
    opacity: Math.random()*0.5+0.3
  });
}

// Datos de familiares (ejemplo)
let familyMembers = [
  {name: "Juan", role: "Padre", color: "#f59e0b", systemX: 400, systemY: 300, orbitRadius: 100, angle: Math.random()*Math.PI*2, speed: 0.002},
  {name: "María", role: "Madre", color: "#ec4899", systemX: 400, systemY: 300, orbitRadius: 150, angle: Math.random()*Math.PI*2, speed: 0.0015},
  {name: "Ana", role: "Hija", color: "#8b5cf6", systemX: 400, systemY: 300, orbitRadius: 200, angle: Math.random()*Math.PI*2, speed: 0.0025},
];

// Dibujar estrellas
function drawStars(){
  stars.forEach(s => {
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  });
}

// Dibujar planetas
function drawPlanet(x, y, color, name){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "12px Cormorant Garamond";
  ctx.textAlign = "center";
  ctx.fillText(name, x, y-20);
}

// Animación principal
function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);

  drawStars(); // fondo fijo
  familyMembers.forEach(member => {
    member.angle += member.speed;
    const x = member.orbitRadius * Math.cos(member.angle) + member.systemX;
    const y = member.orbitRadius * Math.sin(member.angle) + member.systemY;
    drawPlanet(x, y, member.color, member.name);
  });

  requestAnimationFrame(animate);
}
animate();

// Ajuste de canvas al cambiar tamaño de ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Barra de búsqueda
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.toLowerCase();
  const found = familyMembers.find(m => m.name.toLowerCase().includes(query));
  if(found){
    alert(`¡Encontrado: ${found.name}, rol: ${found.role}!`);
  } else {
    alert('Familiar no encontrado.');
  }
});
