import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Room management
interface Room {
    id: string;
    participants: Set<string>;
    createdAt: Date;
}

const rooms = new Map<string, Room>();

// REST endpoints
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/rooms/create', (req, res) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const room: Room = {
        id: roomId,
        participants: new Set(),
        createdAt: new Date(),
    };
    rooms.set(roomId, room);

    // Generate JWT token
    const token = jwt.sign(
        { roomId, role: 'host' },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ roomId, token });
});

app.post('/rooms/join', (req, res) => {
    const { roomId } = req.body;

    if (!roomId) {
        return res.status(400).json({ error: 'Room ID required' });
    }

    const room = rooms.get(roomId);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { roomId, role: 'participant' },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ roomId, token });
});

// Socket.IO signaling
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const roomId = socket.handshake.auth.roomId;

    if (!token) {
        // Allow connections without token for development
        console.log('[Auth] No token provided, allowing connection');
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { roomId: string };
        if (decoded.roomId !== roomId) {
            return next(new Error('Invalid room ID'));
        }
        next();
    } catch (error) {
        console.error('[Auth] Token verification failed:', error);
        next(new Error('Authentication failed'));
    }
});

io.on('connection', (socket: Socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    socket.on('join-room', (roomId: string) => {
        console.log(`[Room] ${socket.id} joining room: ${roomId}`);

        // Create room if it doesn't exist
        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                id: roomId,
                participants: new Set(),
                createdAt: new Date(),
            });
        }

        const room = rooms.get(roomId)!;
        room.participants.add(socket.id);

        socket.join(roomId);

        // Notify others in the room
        socket.to(roomId).emit('user-connected', socket.id);

        // Send list of existing participants
        const otherParticipants = Array.from(room.participants).filter(id => id !== socket.id);
        socket.emit('room-joined', { roomId, participants: otherParticipants });

        console.log(`[Room] ${socket.id} joined ${roomId}. Total participants: ${room.participants.size}`);
    });

    socket.on('offer', (data: { to: string; offer: RTCSessionDescriptionInit }) => {
        console.log(`[Signal] Offer from ${socket.id} to ${data.to}`);
        io.to(data.to).emit('offer', {
            from: socket.id,
            offer: data.offer,
        });
    });

    socket.on('answer', (data: { to: string; answer: RTCSessionDescriptionInit }) => {
        console.log(`[Signal] Answer from ${socket.id} to ${data.to}`);
        io.to(data.to).emit('answer', {
            from: socket.id,
            answer: data.answer,
        });
    });

    socket.on('ice-candidate', (data: { to: string; candidate: RTCIceCandidateInit }) => {
        console.log(`[Signal] ICE candidate from ${socket.id} to ${data.to}`);
        io.to(data.to).emit('ice-candidate', {
            from: socket.id,
            candidate: data.candidate,
        });
    });

    socket.on('disconnect', () => {
        console.log(`[Socket] Client disconnected: ${socket.id}`);

        // Remove from all rooms
        rooms.forEach((room, roomId) => {
            if (room.participants.has(socket.id)) {
                room.participants.delete(socket.id);
                socket.to(roomId).emit('user-disconnected', socket.id);

                // Clean up empty rooms
                if (room.participants.size === 0) {
                    rooms.delete(roomId);
                    console.log(`[Room] Deleted empty room: ${roomId}`);
                }
            }
        });
    });
});

httpServer.listen(PORT, () => {
    console.log(`[Server] Signaling server running on port ${PORT}`);
    console.log(`[Server] CORS origin: ${process.env.CORS_ORIGIN || '*'}`);
});

export default app;
