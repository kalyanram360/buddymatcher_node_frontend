// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Match = () => {
//     const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/auth/protect", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         console.error("JWT verification failed");
//         navigate("/login"); // Redirect if token is invalid
//       }
//     };

//     fetchUser(); // ✅ call this
//   }, [navigate]);
//   const [problemInput, setProblemInput] = useState("");
//   const [onlineProblems, setOnlineProblems] = useState([]);

//   // Fetch online problems on mount
//   useEffect(() => {
//     fetchOnlineProblems();
//   }, []);

//   const fetchOnlineProblems = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/problems/show"); // Your GET endpoint to fetch all problems
//       const data = await res.json();
//       setOnlineProblems(data);
//     } catch (err) {
//       console.error("Failed to fetch problems", err);
//     }
//   };

//   const handleJoinProblem = async () => {
//     console.log("Joining problem:", problemInput);
//     if (!problemInput.trim()) return;

//     try {
//       await fetch("http://localhost:5000/problems/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title: problemInput }),
//       });
//       setProblemInput("");
//       fetchOnlineProblems(); // refresh list
//     } catch (err) {
//       console.error("Error joining problem:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0A1929] text-white p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Join a Problem</h2>

//       <div className="max-w-xl mx-auto mb-10 flex gap-4">
//         <input
//           type="text"
//           placeholder="Enter LeetCode problem title"
//           value={problemInput}
//           onChange={(e) => setProblemInput(e.target.value)}
//           className="flex-1 px-4 py-3 rounded-lg bg-[#1A2332] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleJoinProblem}
//           className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
//         >
//           Join
//         </button>
//       </div>

//       <div className="max-w-xl mx-auto">
//         <h3 className="text-xl font-semibold mb-4">Problems Online</h3>
//         <div className="space-y-4">
//           {onlineProblems.map((problem, index) => (
//             <div
//               key={index}
//               className="bg-[#1A2332] p-4 rounded-lg flex justify-between items-center border border-gray-700"
//             >
//               <span>{problem.title}</span>
//               <span className="text-blue-400">{problem.online_now} online</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Match;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Ensure this matches your backend

const Match = () => {
  const navigate = useNavigate();
  const [problemInput, setProblemInput] = useState("");
  const [onlineProblems, setOnlineProblems] = useState([]);

  useEffect(() => {
    socket.on("matched", ({ roomId }) => {
      navigate(`/chat/${roomId}`);
    });

    return () => socket.off("matched");
  }, [navigate]);

  const fetchOnlineProblems = async () => {
    const res = await fetch("http://localhost:5000/problems/show");
    const data = await res.json();
    setOnlineProblems(data);
  };

  useEffect(() => {
    fetchOnlineProblems();
  }, []);

  const handleJoinProblem = async () => {
    if (!problemInput.trim()) return;

    await fetch("http://localhost:5000/problems/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: problemInput }),
    });

    socket.emit("join-problem", problemInput); // trigger matchmaking

    setProblemInput("");
    fetchOnlineProblems();
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Join a Problem</h2>

      <div className="max-w-xl mx-auto mb-10 flex gap-4">
        <input
          type="text"
          placeholder="Enter LeetCode problem title"
          value={problemInput}
          onChange={(e) => setProblemInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-[#1A2332] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleJoinProblem}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Join
        </button>
      </div>

      <div className="max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Problems Online</h3>
        <div className="space-y-4">
          {onlineProblems.map((problem, index) => (
            <div
              key={index}
              className="bg-[#1A2332] p-4 rounded-lg flex justify-between items-center border border-gray-700"
            >
              <span>{problem.title}</span>
              <span className="text-blue-400">{problem.online_now} online</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Match;

