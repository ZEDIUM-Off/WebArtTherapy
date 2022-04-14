console.log('loading...');
import * as BENV from './babEnv';
import * as BABYLON from 'babylonjs';
//import ammojs 
import 'regenerator-runtime/runtime';


async function main() : Promise<void> {
    BENV.create_babylon();
    console.log('loaded');
}
main();