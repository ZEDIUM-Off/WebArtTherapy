import * as HAND from './3DHand.js'
import * as THREE from '../three.js/build/three.module.js';

const canvas = document.getElementById('can');

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 0.1, 1000);


export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(canvas.width * 4, canvas.height * 4);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const plane = new THREE.Plane(new THREE.Vector3(1, 1, 1), 3);
const planeHelper = new THREE.PlaneHelper(plane, 1, 0xffff00);
scene.add(planeHelper);

HAND.handListing();