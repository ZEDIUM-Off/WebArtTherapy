console.log('loading...');
import * as BENV from './babEnv';
import io from 'socket.io-client';
import { Peer } from 'peerjs';


const peer = new Peer();
const socket = io();
const init = localStorage.getItem('init');

const PCID = localStorage.getItem('PC-ID');

// log the connection
socket.on('connect', () => {

  socket.emit('wait for peer', { PCID, PEERID : peer.id });
});

peer.on('connection', (conn) => {
  console.log('connected to peer');
  conn.on('data', (data) => {
    console.log(data);
  });
});

socket.on('init', () => {
  if (init === 'false') {
    window.location.href = window.location.origin;
  }
});

BENV.create_babylon();