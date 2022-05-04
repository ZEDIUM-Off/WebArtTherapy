
/**
 * Importing all the necessary libraries from '@mediapipe' npm package.
 */
import * as mpCam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import * as mpHands from '@mediapipe/hands';
import drawingUtils from '@mediapipe/drawing_utils';

/**
 * @description This variable is used to get the video input stream of the webcam.
 * @type HTMLVideoElement
 */
const videoElement : HTMLVideoElement = document.getElementsByClassName('input_video')[0] as HTMLVideoElement;

/**
 * @description This variable is used to output the video stream after tracking process.
 * @type HTMLVideoElement
*/
const canvasElement : HTMLCanvasElement= document.getElementsByClassName('output_canvas')[0] as HTMLCanvasElement;

/**
 * @description This variable is used to render the 'Hand overlay' on the video stream.
 * @type HTMLCanvasElement
*/
const canvasCtx : CanvasRenderingContext2D = canvasElement.getContext('2d') as CanvasRenderingContext2D;


/**
 * @description Variable in which is store MULTI_HAND_WORLD_LANDMARKS datas from the '@mediapipe' handtracking process.
 * @type : {@link mpHands.NormalizedLandmarkListList}
 */
export let locksKeypoints : mpHands.NormalizedLandmarkList[] = [];
/**
 * @description Variable in which is store MULTI_HAND_LANDMARKS datas from the '@mediapipe' handtracking process.
 * @type : {@link mpHands.NormalizedLandmarkListList}
 */
export let keypoints : mpHands.NormalizedLandmarkList[] = [];
/**
 * @description Variable in which is store MULTI_HANDEDNESS datas from the '@mediapipe' handtracking process.
 * @type : {@link mpHands.Handedness}
 */
export let handedness : mpHands.Handedness[] = [];

/**
 * @description
 * @param results : {@link mpHands.Results}
 * 
 */
function onResults(results : mpHands.Results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks && results.multiHandedness) {
        locksKeypoints = results.multiHandWorldLandmarks;
        keypoints = results.multiHandLandmarks;
        handedness = results.multiHandedness;
        for (let index = 0; index < results.multiHandLandmarks.length; index++) {
            const classification = results.multiHandedness[index];
            const isRightHand = classification.label === 'Right';
            const landmarks = results.multiHandLandmarks[index];
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpHands.HAND_CONNECTIONS, { color: isRightHand ? '#00FF00' : '#FF0000' });
            drawingUtils.drawLandmarks(canvasCtx, landmarks, {
                color: isRightHand ? '#00FF00' : '#FF0000',
                fillColor: isRightHand ? '#FF0000' : '#00FF00',
            });
        }
    }
    canvasCtx.restore();
}

const hands = new mpHands.Hands({
    locateFile: (file : string) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({
    selfieMode: true,
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new mpCam.Camera(videoElement, {
    onFrame: async() => {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});
camera.start();