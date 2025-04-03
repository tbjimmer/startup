const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  // Create a WebSocket server attached to the HTTP server
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    console.log('🔥 WebSocket client connected!');
    socket.isAlive = true;

    // Broadcast messages to all other connected clients
    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Keep connection alive with ping/pong
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Ping all clients every 10 seconds to keep connections alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };