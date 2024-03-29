import { io } from 'socket.io-client'

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        this.socket = io(process.env.VUE_APP_SOCKET_HOST, {path: process.env.VUE_APP_SOCKET_PATH});
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    
}

export default new SocketioService();