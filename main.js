import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight('white', 0.5));
const dirLight = new THREE.DirectionalLight('white', 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })
);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

let currentMesh = null;

function createShape(type) {
    if (currentMesh) {
        scene.remove(currentMesh);
    }

    let geometry;

    switch (type) {
        case "1":
            geometry = new THREE.BoxGeometry(1, 1, 1);
            break;

        case "2":
            geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
            break;

        case "3":
            geometry = new THREE.ConeGeometry(0.75, 1.5, 32);
            break;

        case "4":
            geometry = new THREE.CylinderGeometry(0.75, 0.75, 1.5, 32);
            break;

        case "5":
            geometry = new THREE.SphereGeometry(0.75, 32, 32);
            break;

        case "6":
            geometry = new THREE.TorusGeometry(0.75, 0.25, 16, 100);
            break;
        
        default:
            return;
    }

    const material = new THREE.MeshStandardMaterial({ color: 'purple' });

    currentMesh = new THREE.Mesh(geometry, material);
    scene.add(currentMesh);

    currentMesh.position.y = 1;


}

window.addEventListener('keydown', (event) => {
    createShape(event.key);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();