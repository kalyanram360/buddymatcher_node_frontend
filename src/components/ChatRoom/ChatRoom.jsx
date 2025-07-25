
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // your backend

// const ChatRoom = () => {
//   const { problemId } = useParams();
//   const [room, setRoom] = useState(null);
//   const [isMatched, setIsMatched] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);



//     useEffect(() => {
//     socket.emit('join-problem', problemId);

//     const handleReceive = (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     };
//     socket.on('match-found', ({ room }) => {
//       setRoom(room);
//       setIsMatched(true);
//       setMessages(prev => [...prev, '✅ Matched! You can now chat.']);
//     });
//     socket.on('receive-message', handleReceive);

//     return () => {
//       socket.off('receive-message', handleReceive); // ✅ safe cleanup
//     };
//   }, [problemId]);

//   const handleSend = () => {
//     if (message.trim() && isMatched && room) {
//       socket.emit('send-message', { room, message });
//       setMessages((prev) => [...prev, `You: ${message}`]);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Chat Room: {problemId}</h2>

//       <div className="border p-2 h-64 overflow-y-auto mb-2 bg-gray-100">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="mb-1">{msg}</div>
//         ))}
//         {!isMatched && <div className="text-gray-500 italic">⏳ Waiting for another user to join...</div>}
//       </div>

//       <div className="flex gap-2">
//         <input
//           className="border p-2 flex-1"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder={isMatched ? 'Type a message...' : 'Waiting for a match...'}
//           disabled={!isMatched}
//         />
//         <button
//           onClick={handleSend}
//           className={`px-4 py-2 rounded ${isMatched ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
//           disabled={!isMatched}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;

// ----------------------------------------------Completely working-----------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // your backend

// const ChatRoom = () => {
//   const { problemId } = useParams();
//   const [room, setRoom] = useState(null);
//   const [isMatched, setIsMatched] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Reset state when problemId changes
//     setRoom(null);
//     setIsMatched(false);
//     setMessages([]);
    
//     // Remove all previous listeners first
//     socket.off('match-found');
//     socket.off('receive-message');
//     socket.off('partner-disconnected');
    
//     socket.emit('join-problem', problemId);

//     const handleMatchFound = ({ room }) => {
//       // Only process if this room belongs to current problemId
//       if (room === `room-${problemId}`) {
//         setRoom(room);
//         setIsMatched(true);
//         setMessages(prev => [...prev, '✅ Matched! You can now chat.']);
//       }
//     };

//     const handleReceiveMessage = (msg) => {
//       setMessages((prev) => [...prev, `Partner: ${msg}`]);
//     };

//     const handlePartnerDisconnected = () => {
//       setMessages(prev => [...prev, '❌ Partner disconnected']);
//       setIsMatched(false);
//     };

//     socket.on('match-found', handleMatchFound);
//     socket.on('receive-message', handleReceiveMessage);
//     socket.on('partner-disconnected', handlePartnerDisconnected);

//     return () => {
//       socket.off('match-found', handleMatchFound);
//       socket.off('receive-message', handleReceiveMessage);
//       socket.off('partner-disconnected', handlePartnerDisconnected);
//     };
//   }, [problemId]);

//   const handleSend = () => {
//     if (message.trim() && isMatched && room) {
//       socket.emit('send-message', { room, message });
//       setMessages((prev) => [...prev, `You: ${message}`]);
//       setMessage('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Chat Room: Problem {problemId}</h2>

//       <div className="border p-2 h-64 overflow-y-auto mb-2 bg-gray-100">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="mb-1">{msg}</div>
//         ))}
//         {!isMatched && <div className="text-gray-500 italic">⏳ Waiting for another user to join...</div>}
//       </div>

//       <div className="flex gap-2">
//         <input
//           className="border p-2 flex-1"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder={isMatched ? 'Type a message...' : 'Waiting for a match...'}
//           disabled={!isMatched}
//         />
//         <button
//           onClick={handleSend}
//           className={`px-4 py-2 rounded ${isMatched ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-white cursor-not-allowed'}`}
//           disabled={!isMatched}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;


// ----------------------------------------------Completely working-----------------------------------------------------------



import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // your backend

const ChatRoom = () => {
  const { problemId } = useParams();
  const [room, setRoom] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset state when problemId changes
    setRoom(null);
    setIsMatched(false);
    setMessages([]);
    
    // Remove all previous listeners first
    socket.off('match-found');
    socket.off('receive-message');
    socket.off('partner-disconnected');
    
    socket.emit('join-problem', problemId);

    const handleMatchFound = ({ room }) => {
      // Only process if this room belongs to current problemId
      if (room === `room-${problemId}`) {
        setRoom(room);
        setIsMatched(true);
        setMessages(prev => [...prev, { 
          type: 'system', 
          content: '✅ Matched! You can now chat and share code.',
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    };

    const handleReceiveMessage = (msgData) => {
      setMessages((prev) => [...prev, {
        type: msgData.type || 'text',
        content: msgData.content || msgData,
        sender: 'partner',
        timestamp: new Date().toLocaleTimeString()
      }]);
    };

    const handlePartnerDisconnected = () => {
      setMessages(prev => [...prev, { 
        type: 'system', 
        content: '❌ Partner disconnected',
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsMatched(false);
    };

    socket.on('match-found', handleMatchFound);
    socket.on('receive-message', handleReceiveMessage);
    socket.on('partner-disconnected', handlePartnerDisconnected);

    return () => {
      socket.off('match-found', handleMatchFound);
      socket.off('receive-message', handleReceiveMessage);
      socket.off('partner-disconnected', handlePartnerDisconnected);
    };
  }, [problemId]);

  const handleSend = () => {
    if (message.trim() && isMatched && room) {
      const messageData = {
        type: isCodeMode ? 'code' : 'text',
        content: message,
        timestamp: new Date().toLocaleTimeString()
      };

      socket.emit('send-message', { room, message: messageData });
      setMessages((prev) => [...prev, {
        ...messageData,
        sender: 'you'
      }]);
      setMessage('');
      setIsCodeMode(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isCodeMode) {
      e.preventDefault();
      handleSend();
    }
  };

  const MessageBubble = ({ msg, index }) => {
    const isSystem = msg.type === 'system';
    const isYou = msg.sender === 'you';
    const isCode = msg.type === 'code';

    if (isSystem) {
      return (
        <div key={index} className="flex justify-center my-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {msg.content}
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`flex mb-4 ${isYou ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isYou 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-white text-gray-800 rounded-bl-md shadow-md border'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-medium ${isYou ? 'text-blue-100' : 'text-gray-500'}`}>
              {isYou ? 'You' : 'Partner'}
            </span>
            <span className={`text-xs ${isYou ? 'text-blue-100' : 'text-gray-400'}`}>
              {msg.timestamp}
            </span>
          </div>
          {isCode ? (
            <div className="mt-2">
              <div className={`text-xs mb-1 ${isYou ? 'text-blue-100' : 'text-gray-500'}`}>
                📝 Code Snippet
              </div>
              <pre className={`text-sm p-2 rounded overflow-x-auto ${
                isYou ? 'bg-blue-600 text-blue-50' : 'bg-gray-50 text-gray-800'
              }`}>
                <code>{msg.content}</code>
              </pre>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Problem #{problemId}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {isMatched ? (
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Connected & Ready to collaborate
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    Searching for a coding partner...
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Room</div>
              <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {room || 'Waiting...'}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="max-w-2xl mx-auto">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} index={idx} />
            ))}
            
            {!isMatched && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Looking for your coding buddy...
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  We're finding another developer to work on Problem #{problemId} with you. 
                  This usually takes just a few seconds!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setIsCodeMode(!isCodeMode)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  isCodeMode 
                    ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                disabled={!isMatched}
              >
                <span>{isCodeMode ? '💻' : '💬'}</span>
                {isCodeMode ? 'Code Mode' : 'Text Mode'}
              </button>
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                {isCodeMode ? (
                  <textarea
                    ref={textareaRef}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none transition-colors font-mono text-sm"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isMatched ? 'Paste your code here...' : 'Waiting for match...'}
                    disabled={!isMatched}
                  />
                ) : (
                  <input
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isMatched ? 'Type your message...' : 'Waiting for match...'}
                    disabled={!isMatched}
                  />
                )}
              </div>
              
              <button
                onClick={handleSend}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  isMatched && message.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isMatched || !message.trim()}
              >
                <span className="flex items-center gap-2">
                  {isCodeMode ? '📤' : '💬'}
                  Send
                </span>
              </button>
            </div>

            {isCodeMode && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                💡 Tip: Use Shift+Enter for new lines in code mode
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;