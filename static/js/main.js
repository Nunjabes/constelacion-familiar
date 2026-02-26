const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- FONDO ---
const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.02 + 0.01
    });
}

function drawStars() {
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
        // Movimiento sutil para dar profundidad
        s.x += s.speed;
        if (s.x > canvas.width) s.x = 0;
    });
}

// --- DATOS DE FAMILIARES ---
let familyMembers = [
    { name: "Padre", role: "Estrella", color: "#f59e0b", x: canvas.width/2 - 80, y: canvas.height/2, orbitRadius: 0, angle: 0, speed: 0, glow: true },
    { name: "Madre", role: "Estrella", color: "#ec4899", x: canvas.width/2 + 80, y: canvas.height/2, orbitRadius: 0, angle: 0, speed: 0, glow: true },
    // Planetas alrededor del sistema
    { name: "Ana", role: "Hija", color: "#8b5cf6", orbitRadius: 150, angle: Math.random()*Math.PI*2, speed: 0.0008, parentX: canvas.width/2 - 40, parentY: canvas.height/2 },
    { name: "Luis", role: "Hijo", color: "#22d3ee", orbitRadius: 200, angle: Math.random()*Math.PI*2, speed: 0.0006, parentX: canvas.width/2 - 40, parentY: canvas.height/2 },
    { name: "Marta", role: "Hija", color: "#f43f5e", orbitRadius: 250, angle: Math.random()*Math.PI*2, speed: 0.0007, parentX: canvas.width/2 - 40, parentY: canvas.height/2 },
    { name: "Pedro", role: "Hijo", color: "#facc15", orbitRadius: 180, angle: Math.random()*Math.PI*2, speed: 0.0009, parentX: canvas.width/2 + 40, parentY: canvas.height/2 },
    { name: "Lucía", role: "Hija", color: "#10b981", orbitRadius: 230, angle: Math.random()*Math.PI*2, speed: 0.0005, parentX: canvas.width/2 + 40, parentY: canvas.height/2 },
    { name: "Diego", role: "Hijo", color: "#a78bfa", orbitRadius: 280, angle: Math.random()*Math.PI*2, speed: 0.0004, parentX: canvas.width/2 + 40, parentY: canvas.height/2 },
    { name: "Elena", role: "Hija", color: "#f97316", orbitRadius: 320, angle: Math.random()*Math.PI*2, speed: 0.0006, parentX: canvas.width/2, parentY: canvas.height/2 },
    { name: "Mario", role: "Hijo", color: "#38bdf8", orbitRadius: 350, angle: Math.random()*Math.PI*2, speed: 0.0003, parentX: canvas.width/2, parentY: canvas.height/2 },
    { name: "Sofía", role: "Hija", color: "#f472b6", orbitRadius: 400, angle: Math.random()*Math.PI*2, speed: 0.0002, parentX: canvas.width/2, parentY: canvas.height/2 }
];

// --- SELECCIÓN Y ZOOM ---
let selected = null;
let zoom = 1;
let targetZoom = 1;
const zoomScale = 2;

// --- PANEL LATERAL ---
function showInfo(member) {
    document.getElementById('info-nombre').textContent = member.name;
    document.getElementById('info-fecha').textContent = member.fecha || "Desconocida";
    document.getElementById('info-edad').textContent = member.age || "-";
    document.getElementById('info-ojos').textContent = member.eyes || "-";
    document.getElementById('info-descripcion').textContent = member.role;
    if(member.photo){
        document.getElementById('info-photo').src = member.photo;
    }
    document.getElementById('info-panel').classList.remove('hidden');
}

document.getElementById('cerrar')?.addEventListener('click', () => {
    selected = null;
    targetZoom = 1;
    document.getElementById('info-panel').classList.add('hidden');
});

// --- BÚSQUEDA ---
document.getElementById('search-btn')?.addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const found = familyMembers.find(m => m.name.toLowerCase().includes(query));
    if(found){
        selected = found;
        targetZoom = zoomScale;
        showInfo(found);
    } else alert("Familiar no encontrado.");
});

// --- DIBUJO DE OBJETOS ---
function drawGlow(x, y, r) {
    const gradient = ctx.createRadialGradient(x, y, r/2, x, y, r);
    gradient.addColorStop(0, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fill();
}

function drawMember(member) {
    let x = member.x || (member.parentX + member.orbitRadius * Math.cos(member.angle));
    let y = member.y || (member.parentY + member.orbitRadius * Math.sin(member.angle));

    if(member.glow){
        drawGlow(x, y, 15);
    }

    ctx.fillStyle = member.color;
    ctx.beginPath();
    ctx.arc(x, y, selected === member ? 25 : 12, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "12px Cormorant Garamond";
    ctx.textAlign = "center";
    ctx.fillText(member.name, x, y - 20);
}

// --- ANIMACIÓN ---
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();

    familyMembers.forEach(m => {
        if(!m.glow){
            m.angle += m.speed;
        }
        drawMember(m);
    });

    requestAnimationFrame(animate);
}
animate();

// --- RESIZE ---
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});