import CANNON from 'cannon';
import * as BABYLON from 'babylonjs';
import * as BHAND from './babHand';
// import * as tfHands from './tfHandTracking';



// declare variable scene type BABYLON.Scene
export let scene: BABYLON.Scene;
let box : BABYLON.Mesh;
// let boxIsCreated : boolean = false;

export function create_babylon() {
    let canvas : HTMLCanvasElement ;
    // get canvas by id
    canvas = (document.getElementById("renderCanvas") as HTMLCanvasElement);
    let engine : BABYLON.Engine;
    let sceneToRender : BABYLON.Scene;
    const createDefaultEngine = () => { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
    const createScene = () => {

        // Create a basic BJS Scene object.
        scene = new BABYLON.Scene(engine);

        // Enable Collisions and gravity
        scene.enablePhysics(new BABYLON.Vector3(0,-9.81,0), new BABYLON.CannonJSPlugin(true, 1,CANNON));

        // Create a FreeCamera, and set its position to (x:0, y:5, z:10).
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, 10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        // Add a basic light, aiming 0,1,0 - meaning, to the sky.
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(1, 1, 0),
            scene, // Always pass this argument explicitly
        );
        light.setEnabled(true);

        // Create a ground mesh
        const ground = BABYLON.MeshBuilder.CreateBox("ground", { height:2 , width: 20, depth: 10}, scene);
        ground.position.y = -2;
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1,restitution : 0.2}, scene);

        box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.2 }, scene);
        box.position.y += 1;
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5, restitution: 0.2 ,friction : 1}, scene);
        return scene;

    };
    try {
        engine = createDefaultEngine();
    } catch (e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        engine = createDefaultEngine();
    }

    if (!engine) console.error("engine should not be null.");


    scene = createScene();

    sceneToRender = scene;
    engine.runRenderLoop(() => {
        if (sceneToRender)
            if (sceneToRender.activeCamera) {
                BHAND.handListing();
                sceneToRender.render();
                scene.onPointerUp = () =>{
                    box.position.set(0,2,0);
                    box.rotation.set(0,0,0);
                }
            }
        });
    // Resize
    window.addEventListener("resize", () => {
        engine.resize();
    });
    // scene.debugLayer.show();
}
