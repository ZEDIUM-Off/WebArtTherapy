import * as UTILS from './utils';
import io from 'socket.io-client';
import {v4 as uuidv4} from 'uuid';

const socket = io();
localStorage.setItem('init','false');
const qrCan: HTMLCanvasElement = document.getElementById(
  'qrcode',
) as HTMLCanvasElement;
const connectionID = uuidv4();
console.log(connectionID);
console.log(window.location.href);

localStorage.setItem('PC-ID',connectionID);
UTILS.generateQrcode(qrCan, connectionID);

socket.on('pc-reload', (ids) => {
  if (ids.PCID === connectionID) {
    socket.emit('ready');
  }
});

socket.on('redirect', (url) => {
  localStorage.setItem('init','true');
  window.location.href = `${window.location.origin}/${url}`;
});