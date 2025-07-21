import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";

export default function ChatRoom() {
  const { problemId } = useParams();
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const lastProblemId = useRef(null);
  const joinEmitted = useRef(false);

  useEffect(() => {
    joinEmitted.current = false;
    // Function to join problem
    const joinProblem = () => {
      if (!joinEmitted.current) {
        console.log("Joining problem:", problemId);
        socket.emit("join-problem", problemId);
        lastProblemId.current = problemId;
        joinEmitted.current = true;
      }
    };

    if (socket.connected) {
      joinProblem();
    } else {
      socket.on("connect", joinProblem);
    }

    // Listen for messages
    socket.on("chat-message", (data) => {
      console.log("Received message:", data);
      setChatLog((prev) => [
        ...prev,
        {
          text: data.message,
          username: data.username,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    });

    socket.on("matched", () => {
      console.log("Matched!");
      setIsMatched(true);
    });

    socket.on("online-users", (count) => {
      console.log("Online users:", count);
      setOnlineUsers(count);
    });

    // Cleanup
    return () => {
      // Leave previous problem room if any
      if (lastProblemId.current) {
        socket.emit("leave-problem", lastProblemId.current);
      }
      socket.off("connect", joinProblem);
      socket.off("chat-message");
      socket.off("matched");
      socket.off("online-users");
    };
  }, [problemId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending message:", message);
    socket.emit("chat-message", { message });
    setMessage("");
  };

  return (
    // ... your existing JSX
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h2 className="text-3xl font-bold">Problem #{problemId} Chat</h2>
          <p className="text-gray-400 mt-1">👥 {onlineUsers} online</p>
          <p className="text-sm text-blue-400">
            {isMatched ? "✅ Partner matched!" : "⏳ Looking for a buddy..."}
          </p>
        </header>

        <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto space-y-2 mb-4">
          {chatLog.map((msg, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between">
                <span className="font-bold text-blue-300">{msg.username}</span>
                <span className="text-gray-400">{msg.timestamp}</span>
              </div>
              <p className="text-white">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <input
            className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
//hi