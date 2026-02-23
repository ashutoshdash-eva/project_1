import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

let currentLight = null;

// Camera

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

const aspect = window.innerWidth / window.innerHeight;

const orthoCamera = new THREE.OrthographicCamera(-5 * aspect, 5 * aspect, 5, -5, 0.1, 1000);
orthoCamera.position.set(5, 5, 5);
orthoCamera.lookAt(0, 0, 0);



// Renderer

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Shadow-Renderer
renderer.shadowMap.enabled = false; // Start with shadows disabled
// Optional: PCFSoftShadowMap makes edges smoother and more realistic
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Controls

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights

// scene.add(new THREE.AmbientLight('white', 0.5));
// const dirLight = new THREE.DirectionalLight('white', 1);
// dirLight.position.set(-5, 10, 7.5);
// scene.add(dirLight);

// Ground

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshPhysicalMaterial({ color: 'white', side: THREE.DoubleSide, roughness: 0.5, metalness: 1.0})
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Make the plane receive shadows
plane.receiveShadow = true;

// Materials

const materials = {
    'basic': new THREE.MeshBasicMaterial({ color: 'purple' }),
    'standard': new THREE.MeshStandardMaterial({ color: 'purple' ,roughness: 0.5, metalness: 0.5}),
    'physical': new THREE.MeshPhysicalMaterial({ color: 'purple', roughness: 0.5, metalness: 0.5}),
    'phong': new THREE.MeshPhongMaterial({ color: 'purple' }),
    'lambert': new THREE.MeshLambertMaterial({ color: 'purple' }),
    'toon': new THREE.MeshToonMaterial({ color: 'purple' }),
    'normal': new THREE.MeshNormalMaterial(),
    'matcap': new THREE.MeshMatcapMaterial({ color: 'purple' }),
    'depth': new THREE.MeshDepthMaterial(),
    'wireframe': new THREE.MeshBasicMaterial({ color: 'purple', wireframe: true }),
}

let currentMaterial = materials.basic;
let currentMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), currentMaterial);

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
            geometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8);
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

        case "7":
            geometry = new THREE.TorusKnotGeometry(0.75, 0.25, 100, 16);
            break;

        case "8":
            geometry = new THREE.OctahedronGeometry(0.75);
            break;

        case "9":
            geometry = new THREE.TetrahedronGeometry(0.75);
            break;

        case "0":
            geometry = new THREE.DodecahedronGeometry(0.75);
            break;
        
        default:
            return;
    }

    currentMesh = new THREE.Mesh(geometry, currentMaterial);
    currentMesh.position.y = 2;
    currentMesh.castShadow = true; // Make the mesh cast shadows

    scene.add(currentMesh);

}

// Keyboard Controls

window.addEventListener('keydown', (event) => {
    createShape(event.key);
});

//Shape Selection Dropdown

document.getElementById("shapeSelect").addEventListener("change", (e) => {
    scene.remove(currentMesh);

    switch (e.target.value) {
        case "1":
            currentMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), currentMaterial);
            break;
        case "2":
            currentMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 2, 4, 8), currentMaterial);
            break;
        case "3":
            currentMesh = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.5, 32), currentMaterial);
            break;
        case "4":
            currentMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.5, 32), currentMaterial);
            break;
        case "5":
            currentMesh = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 32), currentMaterial);
            break;  
        case "6":
            currentMesh = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.25, 16, 100), currentMaterial);
            break;
        case "7":
            currentMesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.75, 0.25, 100, 16), currentMaterial);
            break;
        case "8":
            currentMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.75), currentMaterial);
            break;
        case "9":
            currentMesh = new THREE.Mesh(new THREE.TetrahedronGeometry(0.75), currentMaterial);
            break;
        case "0":
            currentMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75), currentMaterial);
            break;

        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    currentMesh.position.y = 2;
    currentMesh.castShadow = true; // Make the mesh cast shadows
    scene.add(currentMesh);
})

// Material Selection Dropdown

document.getElementById("materialSelect").addEventListener("change", (e) => {
    currentMaterial = materials[e.target.value];
    currentMesh.material = currentMaterial;
});

// Camera View Dropdown

document.getElementById("cameraSelect").addEventListener("change", (e) => {
    if (e.target.value === "perspective") {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(5, 5, 5);
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
    } else {
        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.OrthographicCamera(-5 * aspect, 5 * aspect, 5, -5, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
    }   
});

// Light Dropdown

document.getElementById("lightSelect").addEventListener("change", (e) => {
    // let currentLight = null;
    if (currentLight) {
        scene.remove(currentLight);
    }

    switch (e.target.value) {
        case "ambient":
            currentLight = new THREE.AmbientLight('white', 0.7);
            break;
        case "directional":
            currentLight = new THREE.DirectionalLight('white', 1);
            currentLight.position.set(-5, 10, -7.5);
            const helper = new THREE.DirectionalLightHelper(currentLight, 5);
            scene.add(helper);
            break;
        case "hemisphere":
            currentLight = new THREE.HemisphereLight('white', 'blue', 1);
            const hemiHelper = new THREE.HemisphereLightHelper(currentLight, 5);
            scene.add(hemiHelper);
            break;
        case "point":
            currentLight = new THREE.PointLight('white', 50, 100);
            currentLight.position.set(5, 5, 5);
            const pointHelper = new THREE.PointLightHelper(currentLight, 0.5);
            scene.add(pointHelper);
            break;
        case "spot":
            currentLight = new THREE.SpotLight('white', 20, 50,  Math.PI / 6, 0.5, 1);
            currentLight.position.set(5, 10, 5);
            currentLight.target.position.set(0, 0, 0);
            scene.add(currentLight.target);
            const spotHelper = new THREE.SpotLightHelper(currentLight);
            scene.add(spotHelper);
            break;
        default:
            currentLight = new THREE.AmbientLight('white', 0.7);
            break;        
    }
    scene.add(currentLight);
});
    
// Shadow Toggle
document.getElementById("shadowToggle").addEventListener("change", (e) => {
    const enabled = e.target.checked;
    renderer.shadowMap.enabled = enabled;

    // Object shadows
    if (currentMesh) {
        currentMesh.castShadow = enabled;
    }

    // Ground shadows
    plane.receiveShadow = enabled;

    // Light shadows
    if (currentLight) {
        currentLight.castShadow = enabled;
    }
});

//Axes Helper

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Handle Window Resize

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    currentMesh.rotation.x += 0.01;
    currentMesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();