import "../style/global-style.css";
// import 'regenerator-runtime/runtime';

import * as BABYLON from 'babylonjs';
import * as BHAND from './babHand';
import Ammo from 'ammojs-typed';

//declare variable scene type BABYLON.Scene
export let scene: BABYLON.Scene;

// await Ammo();

export function create_babylon() {
    var canvas : HTMLCanvasElement ;
    //get canvas by id
    canvas = <HTMLCanvasElement> document.getElementById("renderCanvas");
    var engine : BABYLON.Engine;
    var sceneToRender : BABYLON.Scene;
    var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
    const createScene = function() {
        scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, 10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(1, 1, 0),
            scene, // Always pass this argument explicitly
        );
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 10, width: 20, subdivisions: 4 });
        // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
        const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
        box.position.y += 2;
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
    engine.runRenderLoop(function() {
        if (sceneToRender)
            if (sceneToRender.activeCamera) {

                {
                    BHAND.handListing();
                    sceneToRender.render();

                }
            }
    });

    // Resize
    window.addEventListener("resize", function() {
        engine.resize();
    });
    scene.debugLayer.show();
    console.log("hey");
}
create_babylon();