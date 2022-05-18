import P2P from 'socket.io-p2p';
import io from 'socket.io-client';

const socket = io()
const p2p = new P2P(socket);
const id = '12345';

const btn = document.getElementById('btn');
if(btn === null) {
    throw console.error( 'no btn' )
};

btn.addEventListener('click', () => {
    p2p.emit('id', 'my-id is : ' + id);
    console.log('click');
});

p2p.on('ready', (data) => {
    // p2p.usePeerConnection = true;
    console.log('ready' + data);
});

// p2p.emit('peer-obj', { peerId: id })
