import { Server } from 'socket.io';

let io;

export default {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io isn't initialized");
    }
    return io;
  },
};
