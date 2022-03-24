import * as HAND from './3DHand.js';
import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
import Stats from '../three.js/examples/jsm/libs/stats.module.js'
import { GUI } from '../three.js/examples/jsm/libs/lil-gui.module.min.js';



const canvas = document.getElementById('can');
// const modifier = new SimplifyModifier();

export const scene = new THREE.Scene()
scene.background = new THREE.Color(0xe0e0e0);
scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
scene.add(new THREE.AxesHelper(5))

const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 20, 30)
    // camera.lookAt.set(2.5, 0, 0)
    // camera.rotation.set(0.5, 0, 0)

export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)


let gui = new GUI();

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
    // console.log(camera)
}

function render() {
    renderer.render(scene, camera);
}

export function setupDatGui() {

    let folder = gui.addFolder('General Options');

    // folder.add(state, 'animateBones');
    // folder.controllers[0].name('Animate Bones');

    // folder.add(mesh, 'pose');
    // folder.controllers[1].name('.pose()');

    const bones = HAND.skinnedMesh.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {

        const bone = bones[i];

        folder = gui.addFolder('Bone ' + i);

        folder.add(bone.position, 'x', -10 + bone.position.x, 10 + bone.position.x);
        folder.add(bone.position, 'y', -10 + bone.position.y, 10 + bone.position.y);
        folder.add(bone.position, 'z', -10 + bone.position.z, 10 + bone.position.z);

        folder.add(bone.rotation, 'x', -Math.PI * 0.5, Math.PI * 0.5);
        folder.add(bone.rotation, 'y', -Math.PI * 0.5, Math.PI * 0.5);
        folder.add(bone.rotation, 'z', -Math.PI * 0.5, Math.PI * 0.5);

        folder.add(bone.scale, 'x', 0, 2);
        folder.add(bone.scale, 'y', 0, 2);
        folder.add(bone.scale, 'z', 0, 2);

        folder.controllers[0].name('position.x');
        folder.controllers[1].name('position.y');
        folder.controllers[2].name('position.z');

        folder.controllers[3].name('rotation.x');
        folder.controllers[4].name('rotation.y');
        folder.controllers[5].name('rotation.z');

        folder.controllers[6].name('scale.x');
        folder.controllers[7].name('scale.y');
        folder.controllers[8].name('scale.z');

    }

}
HAND.load3DHand();
animate();
HAND.handListing();