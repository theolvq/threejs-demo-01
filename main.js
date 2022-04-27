import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Event listener to keep things responsive
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Grab the canvas from the DOM
const canvas = document.querySelector('canvas.webgl');

// Create a scene
const scene = new THREE.Scene();

// Create a sphere geometry
const sphere = new THREE.SphereGeometry(5, 10, 10);
// give it a material (color or texture)
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true,
});
// combine the geometry and material into a mesh
const mesh = new THREE.Mesh(sphere, material);
// add the mesh to the scene
scene.add(mesh);

// Create a camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of view
  sizes.width / sizes.height, // Aspect ratio
  0.1, // Near clipping plane
  1000, // Far clipping plane
);

camera.position.x = 1;
camera.position.y = 1;
// Move the camera back a bit
camera.position.z = 30;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas });
console.log(renderer);
// Set the size of the renderer
renderer.setSize(sizes.width, sizes.height);
// Set the pixel ratio
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
