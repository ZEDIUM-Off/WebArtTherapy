/**
 * Importing all the necessary libraries from '@mediapipe' npm package.
 */
import * as mpCam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import * as mpHands from '@mediapipe/hands';
import drawingUtils from '@mediapipe/drawing_utils';
import * as controls from '@mediapipe/control_utils';

const CAM_HEIGHT = 720;
const CAM_WIDTH = 1280;
/**
 * @description This variable is used to get the video input stream of the webcam.
 * @type HTMLVideoElement
 */
const videoElement: HTMLVideoElement = document.getElementsByClassName(
  'input_video',
)[0] as HTMLVideoElement;

/**
 * @description This variable is used to output the video stream after tracking process.
 * @type HTMLVideoElement
 */
const canvasElement: HTMLCanvasElement = document.getElementsByClassName(
  'output_canvas',
)[0] as HTMLCanvasElement;

/**
 * @description This variable is used to render the 'Hand overlay' on the video stream.
 * @type HTMLCanvasElement
 */
const canvasCtx: CanvasRenderingContext2D = canvasElement.getContext(
  '2d',
) as CanvasRenderingContext2D;

const controlsElement =
document.getElementsByClassName('control-panel')[0] as HTMLDivElement;
/**
 * @description Variable in which is store MULTI_HAND_WORLD_LANDMARKS datas from the '@mediapipe' handtracking process.
 * @type : {@link mpHands.NormalizedLandmarkListList}
 */
export let locksKeypoints: mpHands.NormalizedLandmarkList[] = [];
/**
 * @description Variable in which is store MULTI_HAND_LANDMARKS datas from the '@mediapipe' handtracking process.
 * @type : {@link mpHands.NormalizedLandmarkListList}
 */
export let keypoints: mpHands.NormalizedLandmarkList[] = [];
/**
 * @description Variable in which is store MULTI_HANDEDNESS datas from the '@mediapipe' handtracking process.
 * @type : {@link mpHands.Handedness}
 */
export let handedness: mpHands.Handedness[] = [];

/**
 * @description
 * @param results : {@link mpHands.Results}
 *
 */
function onResults(results: mpHands.Results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height,
  );
  if (results.multiHandLandmarks && results.multiHandedness) {
    locksKeypoints = results.multiHandWorldLandmarks;
    keypoints = results.multiHandLandmarks;
    handedness = results.multiHandedness;
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];
      drawingUtils.drawConnectors(
        canvasCtx,
        landmarks,
        mpHands.HAND_CONNECTIONS,
        { color: isRightHand ? '#00FF00' : '#FF0000' },
      );
      drawingUtils.drawLandmarks(canvasCtx, landmarks, {
        color: isRightHand ? '#00FF00' : '#FF0000',
        fillColor: isRightHand ? '#FF0000' : '#00FF00',
      });
    }
  }
  canvasCtx.restore();
}

const hands = new mpHands.Hands({
  locateFile: (file: string) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});
hands.setOptions({
  selfieMode: true,
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);

const camera = new mpCam.Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  facingMode: 'environment',
  width: CAM_WIDTH,
  height: CAM_HEIGHT,
});
camera.start();
if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent) &&
  /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    navigator.userAgent,
  )
) {
  new controls
    .ControlPanel(controlsElement, {
      selfieMode: true,
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })
    .add([
      new controls.SourcePicker({
        onFrame:
          async (input: controls.InputImage, size: controls.Rectangle) => {
            const aspect = size.height / size.width;
            let width: number;
            let height: number;
            if (window.innerWidth > window.innerHeight) {
              height = window.innerHeight;
              width = height / aspect;
            } else {
              width = window.innerWidth;
              height = width * aspect;
            }
            canvasElement.width = width;
            canvasElement.height = height;
            await hands.send({image: input});
          },
    }),
    ])
    .on(x => {
      const options = x as mpHands.Options;
      videoElement.classList.toggle('selfie', options.selfieMode);
      hands.setOptions(options);
    });
}