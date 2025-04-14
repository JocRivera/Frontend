import { io } from 'socket.io-client';
const URL = 'http://localhost:3000'; // Replace with your server URL
let socket;

export const initSocket = (token) => {
    socket = io(URL, {
        transports: ['websocket'],
        autoConnect: true,
        auth: { token }, // <-- muy importante

    });

    socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        if (isAdmin()) {
            joinAdminRoom(token);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });

    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
    });

    return socket; // <- Aquí está la solución
};

export const getSocket = () => {
    if (!socket) {
        console.error('Socket not initialized. Call initSocket() first.');
    }
    return socket;
}

const isAdmin = () => {
    // Implement your logic to check if the user is an admin
    // This is just a placeholder function
    return true; // or false based on your logic
}
export const joinAdminRoom = (token) => {
    if (!socket) {
        console.error('Socket not initialized. Call initSocket() first.');
        return;
    }
    socket.emit('join_admin_room', token, (response) => {
        if (response.error) {
            console.error('Error joining admin room:', response.error);
        } else {
            console.log('Joined admin room successfully:', response.message);
        }
    });
    socket.on('admin_room_joined', (response) => {
        console.log('Admin room joined:', response);
    })
}