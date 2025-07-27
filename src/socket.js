// import io from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   autoConnect: true,
//   reconnection: true,
//   reconnectionDelay: 1000,
//   reconnectionAttempts: 5,
//   timeout: 20000,
//   transports: ['websocket']
// });

// export default socket;

// socket.js - Create a singleton socket instance
import { io } from "socket.io-client";
//import backend url from .env file
const BACKEND_URL = "https://buddymatcher-node.onrender.com";
// Adjust the import based on your project structure

class SocketService {
  constructor() {
    this.socket = null;
    this.isInitialized = false;
  }

  initialize(url = BACKEND_URL) {
    if (this.isInitialized && this.socket) {
      console.log("Socket already initialized, returning existing instance");
      return this.socket;
    }

    console.log("Initializing new socket connection");
    this.socket = io(url, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000,
      transports: ["websocket", "polling"],
    });

    // Add connection logging
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    this.isInitialized = true;
    return this.socket;
  }

  getSocket() {
    if (!this.socket) {
      return this.initialize();
    }
    return this.socket;
  }

  connect() {
    const socket = this.getSocket();
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isInitialized = false;
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
