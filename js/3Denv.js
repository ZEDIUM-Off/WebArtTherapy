import * as HAND from './3DHand.js';
import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
import Stats from '../three.js/examples/jsm/libs/stats.module.js'
// import { SimplifyModifier } from '../three.js/examples/jsm/modifiers/SimplifyModifier.js';


const canvas = document.getElementById('can');
// const modifier = new SimplifyModifier();

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0.8, 1.4, 1.0)

export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)




// window.addEventListener('resize', onWindowResize, false);

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     render();
// }

const stats = Stats()
document.body.appendChild(stats.dom);

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();

    stats.update();
}

function render() {
    renderer.render(scene, camera);
    // skeleton.bones[0].rotation.x = 10;
}

animate();

HAND.handListing();