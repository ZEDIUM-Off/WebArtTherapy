// import * as THREE from '/js/three.js';
// import * as THREE from 'https://cdn.skypack.dev/three@v0.138.3';

//   const scene = new THREE.Scene();
// init

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#can')
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
// animation

const points = [];
points.push(new THREE.Vector3(-10, 0, 40));
points.push(new THREE.Vector3(0, 20, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);
scene.add(line)

function animation(time) {

    line.rotation.x = time / 2000;
    line.rotation.y = time / 1000;

    requestAnimationFrame(animation);
    renderer.render(scene, camera);

}

// const loader = new FontLoader();

// loader.load('fonts/helvetiker_regular.typeface.json', function(font) {

//     const txtGeometry = new TextGeometry('Hello three.js!', {
//         font: font,
//         size: 80,
//         height: 5,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     });
// });

// const textTest = new THREE.Line(txtGeometry, material);

renderer.setAnimationLoop(animation);