const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // For MVP, allow all origins
    methods: ['GET', 'POST']
  }
});

// Simple in-memory mock schema for MVP V1 messages
const messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (data) => {
    const newMessage = {
      id: Date.now().toString(),
      text: data.text,
      senderId: data.senderId,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    
    // Broadcast message to everyone including sender
    io.emit('receive_message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
