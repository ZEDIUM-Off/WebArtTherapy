const express = require("express");
const http = require('http');
const app = express();

const server = http.Server(app);
var p2pserver = require('socket.io-p2p-server').Server
const io = require('socket.io')(server);

const path = require("path");



const port = process.env.SERVER_PORT || 3000;


app.use("/", express.static(__dirname + "/public"));



server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});

io.use(p2pserver);
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.broadcast.emit('ready', 'from server');
});

app.get("/", (req, res) => {
    if (getDeviceType(req) === "desktop") {
        res.sendFile(path.join(__dirname, "/public/pages/PC/index.html"));
    } else {
        res.sendFile(path.join(__dirname + "/public/pages/TEL/index.html"));
    }
});

const getDeviceType = (req) => {
    var ua = req.headers['user-agent'];
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};