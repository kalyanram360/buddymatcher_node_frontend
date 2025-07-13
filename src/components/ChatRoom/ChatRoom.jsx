import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatRoom = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("chat-message", (msg) => {
      setChatLog((prev) => [...prev, { text: msg, fromOther: true }]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("chat-message", { roomId, message });
    setChatLog((prev) => [...prev, { text: message, fromOther: false }]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
      <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto space-y-2 mb-4">
        {chatLog.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.fromOther ? "bg-gray-600 text-left" : "bg-blue-500 text-right"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-6 py-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
