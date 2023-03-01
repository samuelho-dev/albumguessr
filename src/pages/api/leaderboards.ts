// Import dependencies
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';


const prisma = new PrismaClient();

let io: any;

export default function handler(req: any, res: any) {
  // Check if socket.io is already initialized
  if (!io) {
    // Create a server for socket.io using the request and response objects
    const server = require('http').createServer(req, res);

    // Initialize socket.io with the server
    io = new Server(server);

    // Listen for connection events
    io.on('connection', (socket) => {
      console.log('A user connected');


              // Emit the messages to the user
        socket.emit('messages', messages);
      });

      // Listen for new message events
      socket.on('new message', async (data) => {
        // Save the message to the database
        const message = await prisma.message.create({
          data: {
            content: data.content,
            sender: data.sender,
            room: data.room,
          },
        });

        // Emit the message to all users in the room
        io.to(data.room).emit('new message', message);
      });

    })
    
  }


}
