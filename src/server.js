const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/:channel/:msg', function (req, res) {
  console.log(`channel: ${req.params['channel']} - message: ${req.params['msg']}`);
  
  const channel = req.params['channel'];

  if (channel !== 'canal1' && channel !== 'canal2')
    return res.json({ status: "ko", message: "Not a valid channel to send messages" });

  io.emit(req.params['channel'], req.params['msg']);

  res.json({ status: "ok", message: "Message send to the socket" });
});

io.on('connection', (socket) => {
  console.log('new client connected ... ');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});