import * as TRACK from './handTracking.js';
import * as THREE from '../three.js/build/three.module.js';
import * as ENV from './3Denv.js';
import { FBXLoader } from '../three.js/examples/jsm/loaders/FBXLoader.js';

export let handObjList = [];

const material = new THREE.MeshNormalMaterial()
const fbxLoader = new FBXLoader()

export function handListing() {
    // requestAnimationFrame(ENV.animate);
    // ENV.renderer.render(ENV.scene, ENV.camera);
    let keyTab = TRACK.keypoints;
    let handTab = TRACK.handedness;
    try {
        if (handTab.length > 0 && keyTab.length > 0) {
            if (handTab.length === 1 && keyTab.length === 1) {
                document.getElementById("body").style.backgroundColor = "green";

            } else if (handTab.length === 2 && keyTab.length === 2) {
                document.getElementById("body").style.backgroundColor = "blue";

            }
            setTimeout(() => { handListing(); }, 10);
        } else if (handTab.length === 0 && keyTab.length === 0) {
            document.getElementById("body").style.backgroundColor = "red";
        }
    } catch (err) {}

    setTimeout(() => { handListing(); }, 10);

}

export function load3DHand() {
    fbxLoader.load(
        '../ressources/handRiggedSimplify.fbx',
        (object) => {
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material = material
                    if (child.material) {
                        child.material.transparent = false
                    }
                }
            })
            object.scale.set(-0.001, 0.001, -0.001);
            console.log(object)
            ENV.scene.add(object);

        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
}