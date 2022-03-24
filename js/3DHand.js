import * as TRACK from './handTracking.js';
import * as THREE from '../three.js/build/three.module.js';
import * as ENV from './3Denv.js';
import { FBXLoader } from '../three.js/examples/jsm/loaders/FBXLoader.js';


export let handObjList = [];
export let skinnedMesh;
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
                controlModel(keyTab, 0);

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

function controlModel(keypoints, index) {
    // console.log(keypoints[index])
    let xPosAv = [];
    let yPosAv = [];
    let zPosAv = [];
    for (let i = 0; i < keypoints[index].length; i++) {
        xPosAv[i] = keypoints[index][i].x
        yPosAv[i] = keypoints[index][i].y
        zPosAv[i] = keypoints[index][i].z
    }
    xPosAv = average(xPosAv);
    yPosAv = average(yPosAv);
    zPosAv = average(zPosAv);

    handObjList[0].position.set(xPosAv * 10, 10 + yPosAv * (-10), 5 + zPosAv * (10))
        // console.log(handObjList[0].position)
        // let dir12 = new THREE.Vector3();
        // let dir23 = new THREE.Vector3();
        // let dir34 = new THREE.Vector3();
        // dir12.subVectors(keypoints[index][1], keypoints[index][2]);
        // dir23.subVectors(keypoints[index][2], keypoints[index][3]);
        // dir34.subVectors(keypoints[index][3], keypoints[index][4]);

    // skinnedMesh.skeleton.bones[1].rotation.setFromVector3(dir12, "XYZ");
    // // skinnedMesh.skeleton.bones[1].position = keypoints[index][1];
    // skinnedMesh.skeleton.bones[2].rotation.setFromVector3(dir23, "XYZ");
    // // skinnedMesh.skeleton.bones[2].position = keypoints[index][2];
    // skinnedMesh.skeleton.bones[3].rotation.setFromVector3(dir34, "XYZ");
    // skinnedMesh.skeleton.bones[3].position = keypoints[index][3];

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
            object.scale.set(-0.003, 0.003, -0.003);
            skinnedMesh = object.children[0];

            // skinnedMesh.scale.set(-0.01, 0.01, -0.01);
            const skHelper = new THREE.SkeletonHelper(skinnedMesh);
            console.log(skinnedMesh.skeleton.bones)
                // console.log(skinnedMesh)
            handObjList.push(object);
            ENV.scene.add(object);
            ENV.scene.add(skHelper);
            ENV.setupDatGui();


        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
}

function average(tab) {
    let sum = 0;
    for (let i of tab) {
        sum += i;
    }
    return sum / tab.length;
}