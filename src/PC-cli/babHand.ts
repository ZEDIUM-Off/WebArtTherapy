import * as BENV from './babEnv';
import * as TRACK from '../mpHandTracking';
import * as BABYLON from 'babylonjs';
import * as mpHands from '@mediapipe/hands';


let RhandIsInit = false;
let LhandIsInit = false;
let handList : string[] = [];
const body : HTMLBodyElement = document.getElementById("body") as HTMLBodyElement;
let joined = false;
const joint1 : BABYLON.PhysicsJoint = new BABYLON.PhysicsJoint(BABYLON.PhysicsJoint.LockJoint, {});


export function handListing() {
    const keyTab = TRACK.locksKeypoints;
    const posTab = TRACK.keypoints;
    const handTab = TRACK.handedness;
    try {
        if (handTab.length > 0 && keyTab.length > 0) {
            if (handTab.length === 1 && keyTab.length === 1) {
                body.style.backgroundColor = "green";
                removeHand(keyTab, handTab);
                actiontHand(keyTab, handTab,posTab);
            } else if (handTab.length === 2 && keyTab.length === 2) {
                body.style.backgroundColor = "blue";
                actiontHand(keyTab, handTab,posTab);
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

    if (keys !== undefined && index !== undefined) {
        keypoints = keys[index];
    }
    for (let i = 0; i < keypoints.length; i++) {
        name = side + "Sphere";
        name += i.toString();
        const sphere = BABYLON.MeshBuilder.CreateSphere(name, { diameter: 0.1, updatable: true, segments: 1 }, BENV.scene);
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
function moveHand(keys :mpHands.NormalizedLandmarkList[], index : number, side : string, pos : mpHands.NormalizedLandmarkList[]) {
    let keypoints :mpHands.NormalizedLandmark[] = [];
    let posTab :mpHands.NormalizedLandmark[] = [];
    let name : string;
    if (keys !== undefined && index !== undefined && pos !== undefined) {
        keypoints = keys[index];
        grab(keypoints[4], keypoints[8]);
        posTab = pos[index];
        console.log(posTab[0]);
    }
    // update spheres position
    for (let i = 0; i < keypoints.length; i++) {
        name = side + "Sphere";
        name += i.toString();
        const sphere  = BENV.scene.getMeshByName(name);
        if (sphere != null) {
            sphere.position.set(2.5 + (-5)* keypoints[i].x + posTab[0].x*(-5), 4+ (-5) * keypoints[i].y + posTab[0].y*(-5), 5 * keypoints[i].z );
        }
    }
}
// remove hand
function removeHand(keyTab : mpHands.NormalizedLandmarkList[], handTab : mpHands.Handedness[]) {
    let name;
    if (keyTab.length === 0 && handTab.length === 0) {
        for (const j of handList) {
            name = j + "Sphere";
            const fixName = name;
            for (let i = 0; i < 21; i++) {
                name = fixName;
                name += i.toString();
                const sphere = BENV.scene.getMeshByName(name);
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
        const fixName = name;
        for (let i = 0; i < keyTab[0].length; i++) {
            name = fixName;
            name += i.toString();
            const sphere = BENV.scene.getMeshByName(name);
            if(sphere != null) {
            sphere.dispose();
            }
        }
    }
}

function actiontHand(keyTab : mpHands.NormalizedLandmarkList[], handTab: mpHands.Handedness[] ,posTab : mpHands.NormalizedLandmarkList[]) {
    for (let i = 0; i < handTab.length; i++) {
        if (handTab[i].label === "Left") {
            if (!LhandIsInit) {
                initHand(keyTab, i, handTab[i].label);
                LhandIsInit = true;
                handList.push(handTab[i].label);
            } else {
                moveHand(keyTab, i, handTab[i].label,posTab);
            }
        } else if (!RhandIsInit) {
            initHand(keyTab, i, handTab[i].label);
            RhandIsInit = true;
            handList.push(handTab[i].label);
        } else {
            moveHand(keyTab, i, handTab[i].label,posTab);
        }
    }
}

function pinched(posThumb : mpHands.NormalizedLandmark, posIndex : mpHands.NormalizedLandmark) {
    const thumb = posThumb;
    const index = posIndex;
    const thumbX = thumb.x;
    const thumbY = thumb.y;
    const thumbZ = thumb.z;
    const indexX = index.x;
    const indexY = index.y;
    const indexZ = index.z;
    const distance = Math.sqrt(Math.pow(thumbX - indexX, 2) + Math.pow(thumbY - indexY, 2) + Math.pow(thumbZ - indexZ, 2));
    if (distance < 0.1) {
        return true;
    } else {
        return false;
    }
}

function grab(posThumb : mpHands.NormalizedLandmark, posIndex : mpHands.NormalizedLandmark ) {
    const thumb = BENV.scene.getMeshByName("RightSphere4");
    const box = BENV.scene.getMeshByName("box");
    const phyEngine = BENV.scene.getPhysicsEngine();


    if(box != null && thumb != null){
        const distance = Math.sqrt(Math.pow(thumb.position.x - box.position.x, 2) + Math.pow(thumb.position.y- box.position.y, 2) + Math.pow(thumb.position.z - box.position.z, 2));
        if (pinched(posThumb, posIndex)) {
            if(distance < 0.3 && thumb.physicsImpostor != null && box.physicsImpostor != null && !joined){
                thumb.physicsImpostor.addJoint(box.physicsImpostor, joint1);
                joined = true;
                // console.log(joined);
            }
        }else if(phyEngine != null && thumb.physicsImpostor != null && box.physicsImpostor != null){
            phyEngine.removeJoint(thumb.physicsImpostor, box.physicsImpostor , joint1);
            joined = false;
            // console.log("not joined");
            // console.log(phyEngine);
        }
    }
}