import * as TRACK from './handTracking.js';
import * as THREE from '../three.js/build/three.module.js';
import * as ENV from './3Denv.js';

export let handObjList = [];
// let handModel;
// export function loadHand() {
//     const fbxLoader = new FBXLoader()
//     fbxLoader.load(
//         '../ressources/handRigged.fbx',
//         (object) => {
//             // object.traverse(function (child) {
//             //     if ((child as THREE.Mesh).isMesh) {
//             //         // (child as THREE.Mesh).material = material
//             //         if ((child as THREE.Mesh).material) {
//             //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
//             //         }
//             //     }
//             // })
//             // object.scale.set(.01, .01, .01)
//             ENV.scene.add(object)
//         },
//         (xhr) => {
//             console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//         },
//         (error) => {
//             console.log(error)
//         }
//     )
// }

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