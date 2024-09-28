import * as THREE from 'three';

const cover = document.getElementById("cover");

// 1. Crear la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(400, 400);
cover.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('self-image.jpg', (texture) => {
    texture.alphaTest = 0.5;  // Configura un valor para la transparencia, si es necesario
});

const radius = 6; 
const segments = 1000;  // Cantidad de segmentos (más segmentos = más suave la circunferencia)
const circleGeometry = new THREE.CircleGeometry(radius, segments);

const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

const circle = new THREE.Mesh(circleGeometry, material);
scene.add(circle);
camera.position.z = 10;

window.addEventListener("mousemove", (event) => {
	if (circle) {
		// Normalizamos la posición del ratón
		const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
		const mouseY = (event.clientY / window.innerHeight) * 2 + 1;

		// Calculamos la rotación en base a la posición del ratón
		circle.rotation.y = (mouseX * 0.03); // Rota en el eje Y
		circle.rotation.x = (mouseY * 0.03); // Rota en el eje X (opcional)
	}
});

// 6. Función de animación
function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}

animate();