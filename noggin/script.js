import * as THREE from "three";
import { OrbitControls } from "../addons/controls/OrbitControls.js";
import { GLTFLoader } from "../addons/loaders/GLTFLoader.js";
import { AsciiEffect } from "../addons/effects/AsciiEffect.js";

let effect;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });

effect = new AsciiEffect(renderer, ' -.+:/ofts#*%@[%', { invert: true });
effect.setSize(window.innerWidth, window.innerHeight);

effect.domElement.style.transform = 'scale(0.75)'; 
effect.domElement.style.color = 'black';
effect.domElement.style.backgroundColor = 'white';
document.body.appendChild(effect.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const loader = new GLTFLoader();
loader.load(
    "face.glb",
    (gltf) => {
        const model = gltf.scene;
        model.rotation.y = -Math.PI / 1.5;

        scene.add(model);
    },
    undefined,
    (error) => console.error("Error loading model:", error)
);

const controls = new OrbitControls(camera, effect.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    effect.render(scene, camera);
}

animate();
