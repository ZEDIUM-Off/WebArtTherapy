import io from 'socket.io-client';
import { DataConnection, Peer } from 'peerjs';
import { getCookie } from '../utils';
import * as TRACK from '../mpHandTracking';

const peer = new Peer();
const socket = io();

const idGeted = getCookie('PC-ID');

console.log(idGeted);
socket.on('connect', () => {
  console.log('qr-scanned');
  socket.emit('qr-scanned', idGeted);
});

socket.on('signal peer' , (ids) => {
  if (ids.PCID === idGeted) {
    const conn = peer.connect(ids.PEERID);
    console.log(`trying to connect to peer: ${ids.PEERID}`);
    conn.on('open', () => {
      console.log('connected to peer');
      sendTracking(conn);
    });
  }
});

function sendTracking(conn: DataConnection): void {
  const keyTab = TRACK.locksKeypoints;
  const posTab = TRACK.keypoints;
  const handTab = TRACK.handedness;
  conn.send({
    keyTab,
    posTab,
    handTab,
  });
  setTimeout(() => {
    sendTracking(conn);
  }, 8);
}