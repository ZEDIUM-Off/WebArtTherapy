import * as BENV from './babEnv';
import * as TRACK from './mpHandTracking';
import * as BABYLON from 'babylonjs';

import * as mpHands from '@mediapipe/hands';

let RhandIsInit = false;
let LhandIsInit = false;
let handList : Array<string> = [];
let body : HTMLBodyElement = document.getElementById("body") as HTMLBodyElement;


export function handListing() {
    let keyTab = TRACK.keypoints;
    let handTab = TRACK.handedness;
    try {
        if (handTab.length > 0 && keyTab.length > 0) {
            if (handTab.length === 1 && keyTab.length === 1) {
                body.style.backgroundColor = "green";
                removeHand(keyTab, handTab);
                actiontHand(keyTab, handTab);
            } else if (handTab.length === 2 && keyTab.length === 2) {
                body.style.backgroundColor = "blue";
                actiontHand(keyTab, handTab);
            }
            setTimeout(() => { handListing(); }, 10);
        } else if (handTab.length === 0 && keyTab.length === 0) {
            body.style.backgroundColor = "red";
            removeHand(keyTab, handTab);
        }
    } catch (err) {
        console.error(err);
    }
    setTimeout(() => { handListing(); }, 10);
}

export function initHand(keys : mpHands.NormalizedLandmarkList[], index : number, side : string) {
    let keypoints : mpHands.NormalizedLandmark[] = [];
    let name : string;

    const rMat = new BABYLON.StandardMaterial("rMat", BENV.scene);
    rMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    const lMat = new BABYLON.StandardMaterial("lMat", BENV.scene);
    lMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    if (keys != undefined && index != undefined) {
        keypoints = keys[index];
    }
    for (let i = 0; i < keypoints.length; i++) {
        name = side + "Sphere";
        name += i.toString();
        let sphere = BABYLON.MeshBuilder.CreateSphere(name, { diameter: 0.1, updatable: true, segments: 1 }, BENV.scene);
        if(sphere != null){
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass:0 }, BENV.scene);
            if( side === "Right" ){
                
                sphere.material = rMat;
            }else{
                sphere.material = lMat;
            }
        }
    }
}

// move hand 
function moveHand(keys :mpHands.NormalizedLandmarkList[], index : number, side : string) {
    let keypoints :mpHands.NormalizedLandmark[] = [];
    let name : string;
    if (keys != undefined && index != undefined) {
        keypoints = keys[index];
        grab(keypoints[4], keypoints[8]);
    }
    // update spheres position
    for (let i = 0; i < keypoints.length; i++) {
        name = side + "Sphere";
        name += i.toString();
        let sphere  = BENV.scene.getMeshByName(name);
        if (sphere != null) {
            sphere.position.set(-2 * keypoints[i].x +1, 1 + (-2) * keypoints[i].y, 2**2 * keypoints[i].z+0.2);
        }
    }
}
// remove hand
function removeHand(keyTab : mpHands.NormalizedLandmarkList[], handTab : mpHands.Handedness[]) {
    let name;
    if (keyTab.length === 0 && handTab.length === 0) {
        for (let j of handList) {
            name = j + "Sphere";
            let fixName = name;
            for (let i = 0; i < 21; i++) {
                name = fixName;
                name += i.toString();
                let sphere = BENV.scene.getMeshByName(name);
                if(sphere != null) {
                sphere.dispose();
                }
            }
        }
        handList = [];
        LhandIsInit = false;
        RhandIsInit = false;
    } else {
        if (handTab[0].label === "Left") {
            name = "RightSphere";
            RhandIsInit = false;
        } else {
            name = "LeftSphere";
            LhandIsInit = false;
        }
        let fixName = name;
        for (let i = 0; i < keyTab[0].length; i++) {
            name = fixName;
            name += i.toString();
            let sphere = BENV.scene.getMeshByName(name);
            if(sphere != null) {
            BENV.scene.removeMesh(sphere);
            }
        }
    }
}

function actiontHand(keyTab : mpHands.NormalizedLandmarkList[], handTab: mpHands.Handedness[]) {
    for (let i = 0; i < handTab.length; i++) {
        if (handTab[i].label === "Left") {
            if (!LhandIsInit) {
                initHand(keyTab, i, handTab[i].label);
                LhandIsInit = true;
                handList.push(handTab[i].label);
            } else {
                moveHand(keyTab, i, handTab[i].label);
            }
        } else if (!RhandIsInit) {
            initHand(keyTab, i, handTab[i].label);
            RhandIsInit = true;
            handList.push(handTab[i].label);
        } else {
            moveHand(keyTab, i, handTab[i].label);
        }
    }
}

function pinched(posThumb : mpHands.NormalizedLandmark, posIndex : mpHands.NormalizedLandmark) {
    let thumb = posThumb;
    let index = posIndex;
    let thumbX = thumb.x;
    let thumbY = thumb.y;
    let thumbZ = thumb.z;
    let indexX = index.x;
    let indexY = index.y;
    let indexZ = index.z;
    let distance = Math.sqrt(Math.pow(thumbX - indexX, 2) + Math.pow(thumbY - indexY, 2) + Math.pow(thumbZ - indexZ, 2));
    if (distance < 0.1) {
        return true;
    } else {
        return false;
    }
}

function grab(posThumb : mpHands.NormalizedLandmark, posIndex : mpHands.NormalizedLandmark) {
    let thumb = BENV.scene.getMeshByName("RightSphere4");
    let box = BENV.scene.getMeshByName("box");
    var joint1 : BABYLON.PhysicsJoint = new BABYLON.PhysicsJoint(BABYLON.PhysicsJoint.LockJoint, {});
    var phyEngine = BENV.scene.getPhysicsEngine(); 

    if(box != null && thumb != null){
        let distance = Math.sqrt(Math.pow(thumb.position.x - box.position.x, 2) + Math.pow(thumb.position.y- box.position.y, 2) + Math.pow(thumb.position.z - box.position.z, 2));  
        
        if (pinched(posThumb, posIndex)) {
            if(distance < 0.3 && thumb.physicsImpostor != null && box.physicsImpostor != null){ 
                thumb.physicsImpostor.addJoint(box.physicsImpostor, joint1);
                console.log("joined");
            } 
        }else if(phyEngine != null && thumb.physicsImpostor != null && box.physicsImpostor != null){
            phyEngine.removeJoint(thumb.physicsImpostor, box.physicsImpostor , joint1);
            console.log("remove");
        }
    }
}
