// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import socket from "../../socket";

// export default function ChatRoom() {
//   const { problemId } = useParams();
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState(0);
//   const [isMatched, setIsMatched] = useState(false);
//   const lastProblemId = useRef(null);
//   const joinEmitted = useRef(false);

//   useEffect(() => {
//     joinEmitted.current = false;
//     // Function to join problem
//     const joinProblem = () => {
//       if (!joinEmitted.current) {
//         console.log("Joining problem:", problemId);
//         socket.emit("join-problem", problemId);
//         lastProblemId.current = problemId;
//         joinEmitted.current = true;
//       }
//     };

//     if (socket.connected) {
//       joinProblem();
//     } else {
//       socket.on("connect", joinProblem);
//     }

//     // Listen for messages
//     socket.on("chat-message", (data) => {
//       console.log("Received message:", data);
//       // System message handling
//       if (data.username === "System") {
//         // LeetCode link system message
//         if (data.message.startsWith("Problem Link:")) {
//           setChatLog((prev) => [
//             ...prev,
//             {
//               text: data.message,
//               username: data.username,
//               timestamp: new Date().toLocaleTimeString(),
//               isLink: true,
//             },
//           ]);
//           return;
//         }
//         // Partner matched
//         if (data.message.includes("Partner matched!")) {
//           setIsMatched(true);
//         }
//         // Matching buddy
//         if (data.message.includes("Matching buddy")) {
//           setIsMatched(false);
//         }
//         // Partner disconnected
//         if (data.message.includes("Your partner has disconnected")) {
//           setIsMatched(false);
//         }
//         setChatLog((prev) => [
//           ...prev,
//           {
//             text: data.message,
//             username: data.username,
//             timestamp: new Date().toLocaleTimeString(),
//             isSystem: true,
//           },
//         ]);
//         return;
//       }
//       // Normal message
//       setChatLog((prev) => [
//         ...prev,
//         {
//           text: data.message,
//           username: data.username,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     });

//     socket.on("matched", () => {
//       console.log("Matched!");
//       setIsMatched(true);
//     });

//     socket.on("online-users", (count) => {
//       console.log("Online users:", count);
//       setOnlineUsers(count);
//     });

//     // Cleanup
//     return () => {
//       // Leave previous problem room if any
//       if (lastProblemId.current) {
//         socket.emit("leave-problem", lastProblemId.current);
//       }
//       socket.off("connect", joinProblem);
//       socket.off("chat-message");
//       socket.off("matched");
//       socket.off("online-users");
//     };
//   }, [problemId]);

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     console.log("Sending message:", message);
//     socket.emit("chat-message", { message });
//     setMessage("");
//   };

//   return (
//     // ... your existing JSX
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-6">
//           <h2 className="text-3xl font-bold">Problem #{problemId} Chat</h2>
//           <p className="text-gray-400 mt-1">👥 {onlineUsers} online</p>
//           <p className="text-sm text-blue-400">
//             {isMatched ? "✅ Partner matched!" : "⏳ Looking for a buddy..."}
//           </p>
//         </header>

//         <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto space-y-2 mb-4">
//           {chatLog.map((msg, idx) => (
//             <div key={idx} className="text-sm">
//               <div className="flex justify-between">
//                 <span className={`font-bold ${msg.username === "System" ? "text-yellow-400" : "text-blue-300"}`}>{msg.username}</span>
//                 <span className="text-gray-400">{msg.timestamp}</span>
//               </div>
//               {msg.isLink ? (
//                 <a
//                   href={msg.text.replace("Problem Link: ", "").trim()}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-green-400 underline"
//                 >
//                   {msg.text}
//                 </a>
//               ) : (
//                 <p className={msg.isSystem ? "text-yellow-300" : "text-white"}>{msg.text}</p>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-4">
//           <input
//             className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type a message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// //hi

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import socketService from "../../socket.js"; // Use the new socket service

// export default function ChatRoom() {
//   const { problemId } = useParams();
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState(0);
//   const [isMatched, setIsMatched] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("connecting");
//   const [isJoining, setIsJoining] = useState(false);
  
//   // Refs to prevent duplicate operations
//   const hasJoinedRef = useRef(false);
//   const currentProblemRef = useRef(null);
//   const socketRef = useRef(null);
//   const listenersSetupRef = useRef(false);

//   // Memoized event handlers to prevent recreation
//   const handleConnect = useCallback(() => {
//     console.log("Socket connected successfully");
//     setConnectionStatus("connected");
    
//     // Join problem if not already joined
//     if (problemId && !hasJoinedRef.current && currentProblemRef.current === problemId) {
//       console.log("Auto-joining problem on connect:", problemId);
//       setIsJoining(true);
//       socketRef.current.emit("join-problem", problemId);
//       hasJoinedRef.current = true;
//       setIsJoining(false);
//     }
//   }, [problemId]);

//   const handleDisconnect = useCallback((reason) => {
//     console.log("Socket disconnected:", reason);
//     setConnectionStatus("disconnected");
//     setIsMatched(false);
//     hasJoinedRef.current = false;
//   }, []);

//   const handleChatMessage = useCallback((data) => {
//     console.log("Received message:", data);
    
//     const newMessage = {
//       text: data.message,
//       username: data.username,
//       timestamp: new Date().toLocaleTimeString(),
//       isSystem: data.username === "System",
//       isLink: data.username === "System" && data.message.startsWith("Problem Link:")
//     };

//     // Handle system messages for matching status
//     if (data.username === "System") {
//       if (data.message.includes("Partner matched!")) {
//         setIsMatched(true);
//       } else if (data.message.includes("Matching buddy") || data.message.includes("disconnected")) {
//         setIsMatched(false);
//       }
//     }

//     setChatLog(prev => [...prev, newMessage]);
//   }, []);

//   const handleMatched = useCallback(() => {
//     console.log("Matched event received");
//     setIsMatched(true);
//   }, []);

//   const handleWaiting = useCallback(() => {
//     console.log("Waiting event received");
//     setIsMatched(false);
//   }, []);

//   const handleOnlineUsers = useCallback((count) => {
//     console.log("Online users update:", count);
//     setOnlineUsers(count);
//   }, []);

//   const handleConnectError = useCallback((error) => {
//     console.error("Connection error:", error);
//     setConnectionStatus("error");
//   }, []);

//   const setupSocketListeners = useCallback((socket) => {
//     if (listenersSetupRef.current) {
//       console.log("Listeners already setup, skipping");
//       return;
//     }

//     console.log("Setting up socket listeners");
    
//     // Remove any existing listeners first
//     socket.off("connect");
//     socket.off("disconnect");
//     socket.off("chat-message");
//     socket.off("matched");
//     socket.off("waiting");
//     socket.off("online-users");
//     socket.off("connect_error");

//     // Add fresh listeners
//     socket.on("connect", handleConnect);
//     socket.on("disconnect", handleDisconnect);
//     socket.on("chat-message", handleChatMessage);
//     socket.on("matched", handleMatched);
//     socket.on("waiting", handleWaiting);
//     socket.on("online-users", handleOnlineUsers);
//     socket.on("connect_error", handleConnectError);

//     listenersSetupRef.current = true;
//   }, [handleConnect, handleDisconnect, handleChatMessage, handleMatched, handleWaiting, handleOnlineUsers, handleConnectError]);

//   const joinProblem = useCallback(() => {
//     if (!problemId || hasJoinedRef.current || isJoining) {
//       console.log("Skipping join - already joined or in progress");
//       return;
//     }

//     if (!socketRef.current || !socketRef.current.connected) {
//       console.log("Socket not connected, cannot join");
//       return;
//     }

//     console.log("Joining problem:", problemId);
//     setIsJoining(true);
//     socketRef.current.emit("join-problem", problemId);
//     hasJoinedRef.current = true;
//     setIsJoining(false);
//   }, [problemId, isJoining]);

//   // Main effect for socket connection and problem joining
//   useEffect(() => {
//     console.log("ChatRoom effect running for problemId:", problemId);

//     // Reset state when problem changes
//     if (currentProblemRef.current !== problemId) {
//       console.log("Problem changed, resetting state");
//       setChatLog([]);
//       setIsMatched(false);
//       setOnlineUsers(0);
//       hasJoinedRef.current = false;
//       currentProblemRef.current = problemId;
//     }

//     // Get or create socket
//     const socket = socketService.connect();
//     socketRef.current = socket;

//     // Setup listeners
//     setupSocketListeners(socket);

//     // Join problem if connected
//     if (socket.connected) {
//       joinProblem();
//     }

//     // Cleanup function
//     return () => {
//       console.log("ChatRoom cleanup");
      
//       // Leave problem room
//       if (hasJoinedRef.current && currentProblemRef.current && socketRef.current) {
//         console.log("Leaving problem:", currentProblemRef.current);
//         socketRef.current.emit("leave-problem", currentProblemRef.current);
//         hasJoinedRef.current = false;
//       }

//       // Don't disconnect the socket here - let it be reused
//       listenersSetupRef.current = false;
//     };
//   }, [problemId, setupSocketListeners, joinProblem]);

//   const sendMessage = useCallback(() => {
//     if (!message.trim() || !socketRef.current?.connected) {
//       console.log("Cannot send message - empty or not connected");
//       return;
//     }
    
//     console.log("Sending message:", message);
//     socketRef.current.emit("chat-message", { message: message.trim() });
//     setMessage("");
//   }, [message]);

//   const handleKeyPress = useCallback((e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   }, [sendMessage]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-6">
//           <h2 className="text-3xl font-bold">Problem #{problemId} Chat</h2>
//           <div className="flex items-center gap-4 mt-2">
//             <p className="text-gray-400">👥 {onlineUsers} online</p>
//             <p className={`text-sm px-2 py-1 rounded ${
//               connectionStatus === "connected" ? "bg-green-600" : 
//               connectionStatus === "error" ? "bg-red-600" : "bg-yellow-600"
//             }`}>
//               {connectionStatus === "connected" ? "🟢 Connected" : 
//                connectionStatus === "error" ? "🔴 Error" : "🟡 Connecting..."}
//             </p>
//             {isJoining && <p className="text-sm text-blue-400">Joining room...</p>}
//           </div>
//           <p className={`text-sm mt-1 ${isMatched ? "text-green-400" : "text-yellow-400"}`}>
//             {isMatched ? "✅ Partner matched! Start chatting!" : "⏳ Looking for a buddy..."}
//           </p>
//         </header>

//         <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto space-y-3 mb-4">
//           {chatLog.length === 0 ? (
//             <div className="text-gray-500 text-center py-8">
//               {connectionStatus === "connected" ? 
//                 "Waiting for messages..." : 
//                 "Connecting to chat..."
//               }
//             </div>
//           ) : (
//             chatLog.map((msg, idx) => (
//               <div key={`${idx}-${msg.timestamp}`} className="text-sm">
//                 <div className="flex justify-between items-start">
//                   <span className={`font-bold ${
//                     msg.username === "System" ? "text-yellow-400" : 
//                     msg.username === "You" ? "text-blue-300" : "text-green-300"
//                   }`}>
//                     {msg.username}
//                   </span>
//                   <span className="text-gray-400 text-xs">{msg.timestamp}</span>
//                 </div>
//                 {msg.isLink ? (
//                   <a
//                     href={msg.text.replace("Problem Link: ", "").trim()}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-green-400 underline hover:text-green-300"
//                   >
//                     {msg.text}
//                   </a>
//                 ) : (
//                   <p className={`mt-1 ${
//                     msg.isSystem ? "text-yellow-300 italic" : "text-white"
//                   }`}>
//                     {msg.text}
//                   </p>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         <div className="flex gap-4">
//           <input
//             className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={
//               connectionStatus !== "connected" ? "Connecting..." :
//               !isMatched ? "Waiting for partner..." : 
//               "Type a message..."
//             }
//             disabled={connectionStatus !== "connected"}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={!message.trim() || connectionStatus !== "connected"}
//             className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>

//         {/* Debug info - remove in production */}
//         <div className="mt-4 text-xs text-gray-500">
//           Debug: Socket ID: {socketRef.current?.id || 'Not connected'} | 
//           Joined: {hasJoinedRef.current ? 'Yes' : 'No'} |
//           Problem: {currentProblemRef.current}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/ChatPage.jsx




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // your backend

const ChatRoom = () => {
  const { problemId } = useParams();
  const [room, setRoom] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.emit('join-problem', problemId);

    // socket.on('match-found', ({ room }) => {
    //   setRoom(room);
    //   setIsMatched(true);
    //   setMessages(prev => [...prev, '✅ Matched! You can now chat.']);
    // });

  //   socket.on('receive-message', (msg) => {
  //     setMessages((prev) => [...prev, `Partner: ${msg}`]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [problemId]);

  //////////--------------working with small bug----------/////
    useEffect(() => {
    socket.emit('join-problem', problemId);

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on('match-found', ({ room }) => {
      setRoom(room);
      setIsMatched(true);
      setMessages(prev => [...prev, '✅ Matched! You can now chat.']);
    });
    socket.on('receive-message', handleReceive);

    return () => {
      socket.off('receive-message', handleReceive); // ✅ safe cleanup
    };
  }, [problemId]);
  ////////////////////////------------------------///////////////////

  const handleSend = () => {
    if (message.trim() && isMatched && room) {
      socket.emit('send-message', { room, message });
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat Room: {problemId}</h2>

      <div className="border p-2 h-64 overflow-y-auto mb-2 bg-gray-100">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">{msg}</div>
        ))}
        {!isMatched && <div className="text-gray-500 italic">⏳ Waiting for another user to join...</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isMatched ? 'Type a message...' : 'Waiting for a match...'}
          disabled={!isMatched}
        />
        <button
          onClick={handleSend}
          className={`px-4 py-2 rounded ${isMatched ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
          disabled={!isMatched}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
