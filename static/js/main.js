const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Estrellas
const stars = [];
for(let i=0; i<100; i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.5+1,
    opacity: Math.random()*0.5+0.3
  });
}

// Datos familiares
const familyMembers = [
  {name: "Juan", role:"Padre", color:"#f59e0b", systemX: 400, systemY:300, orbitRadius:100, angle:Math.random()*2*Math.PI, speed:0.001, size:20, photo:"assets/images/padre.jpg"},
  {name: "María", role:"Madre", color:"#ec4899", systemX: 500, systemY:300, orbitRadius:100, angle:Math.random()*2*Math.PI, speed:0.001, size:20, photo:"assets/images/madre.jpg"},
  // 10 planetas alrededor de las estrellas
  {name:"Ana", role:"Hija", color:"#8b5cf6", systemX:400, systemY:300, orbitRadius:150, angle:Math.random()*2*Math.PI, speed:0.0007, size:10, photo:"assets/images/hija.jpg"},
  {name:"Luis", role:"Hijo", color:"#10b981", systemX:400, systemY:300, orbitRadius:180, angle:Math.random()*2*Math.PI, speed:0.0008, size:10, photo:"assets/images/hijo.jpg"},
  {name:"Carlos", role:"Hijo", color:"#f43f5e", systemX:400, systemY:300, orbitRadius:210, angle:Math.random()*2*Math.PI, speed:0.0006, size:10, photo:"assets/images/hijo2.jpg"},
  {name:"Elena", role:"Hija", color:"#facc15", systemX:500, systemY:300, orbitRadius:150, angle:Math.random()*2*Math.PI, speed:0.0009, size:10, photo:"assets/images/hija2.jpg"},
  {name:"Pedro", role:"Hijo", color:"#3b82f6", systemX:500, systemY:300, orbitRadius:180, angle:Math.random()*2*Math.PI, speed:0.0008, size:10, photo:"assets/images/hijo3.jpg"},
  {name:"Lucia", role:"Hija", color:"#8b5cf6", systemX:500, systemY:300, orbitRadius:210, angle:Math.random()*2*Math.PI, speed:0.0007, size:10, photo:"assets/images/hija3.jpg"},
  {name:"Miguel", role:"Hijo", color:"#f97316", systemX:400, systemY:300, orbitRadius:240, angle:Math.random()*2*Math.PI, speed:0.0007, size:10, photo:"assets/images/hijo4.jpg"},
  {name:"Sofia", role:"Hija", color:"#14b8a6", systemX:500, systemY:300, orbitRadius:240, angle:Math.random()*2*Math.PI, speed:0.0006, size:10, photo:"assets/images/hija4.jpg"},
  {name:"David", role:"Hijo", color:"#e11d48", systemX:400, systemY:300, orbitRadius:270, angle:Math.random()*2*Math.PI, speed:0.0005, size:10, photo:"assets/images/hijo5.jpg"},
  {name:"Clara", role:"Hija", color:"#a855f7", systemX:500, systemY:300, orbitRadius:270, angle:Math.random()*2*Math.PI, speed:0.0006, size:10, photo:"assets/images/hija5.jpg"}
];

// Dibujar fondo de estrellas
function drawStars(){
  stars.forEach(s => {
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  });
}

// Dibujar órbitas
function drawOrbit(x, y, radius){
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.stroke();
}

// Dibujar planetas y estrellas
function drawBody(member){
  const x = member.orbitRadius * Math.cos(member.angle) + member.systemX;
  const y = member.orbitRadius * Math.sin(member.angle) + member.systemY;

  // Glow solo para estrellas
  if(member.size >= 20){
    ctx.shadowColor = member.color;
    ctx.shadowBlur = 15;
  } else {
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = member.color;
  ctx.beginPath();
  ctx.arc(x, y, member.size, 0, Math.PI*2);
  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.fillStyle = "#fff";
  ctx.font = "12px Cormorant Garamond";
  ctx.textAlign = "center";
  ctx.fillText(member.name, x, y - member.size - 5);

  return {x, y};
}

// Animación
function animate(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawStars();

  familyMembers.forEach(member => {
    member.angle += member.speed;
    drawOrbit(member.systemX, member.systemY, member.orbitRadius);
    const coords = drawBody(member);
    member.currentX = coords.x;
    member.currentY = coords.y;
  });

  requestAnimationFrame(animate);
}
animate();

// Ajuste al redimensionar ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Interacción con panel
const infoPanel = document.getElementById("info-panel");
const nombreEl = document.getElementById("info-nombre");
const rolEl = document.getElementById("info-rol");
const fechaEl = document.getElementById("info-fecha");
const edadEl = document.getElementById("info-edad");
const fotoEl = document.getElementById("info-foto");
const cerrarBtn = document.getElementById("cerrar");

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  familyMembers.forEach(member => {
    const dx = mouseX - member.currentX;
    const dy = mouseY - member.currentY;
    if(Math.sqrt(dx*dx + dy*dy) <= member.size){
      // Mostrar panel
      nombreEl.textContent = member.name;
      rolEl.textContent = member.role;
      fechaEl.textContent = "01/01/1970"; // puedes actualizar datos
      edadEl.textContent = "50"; // ejemplo
      fotoEl.src = member.photo;
      infoPanel.classList.remove("hidden");
    }
  });
});

cerrarBtn.addEventListener("click", () => {
  infoPanel.classList.add("hidden");
});