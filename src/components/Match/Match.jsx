// pages/ProblemSelection.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProblemSelection = () => {
  const [problemId, setProblemId] = useState("");
  const [activeProblems, setActiveProblems] = useState({});
  const navigate = useNavigate();

  const fetchActiveProblems = async () => {
    try {
      const res = await fetch("http://localhost:5000/problems/show");
      const data = await res.json();
      setActiveProblems(data.active_problems || {});
    } catch (err) {
      console.error("Failed to fetch active problems:", err);
    }
  };

  useEffect(() => {
    fetchActiveProblems();
    const interval = setInterval(fetchActiveProblems, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = () => {
    if (!problemId.trim()) return;
    navigate(`/chat/${problemId}`, { state: { problemTitle: problemId } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center">Join a LeetCode Problem</h2>

        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <label className="block text-gray-300 mb-2">Enter LeetCode Problem Number</label>
          <input
            type="number"
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            placeholder="e.g. 1 for Two Sum"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleJoin}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Join Chat
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">🔥 Problems Being Solved Now</h3>
          {Object.keys(activeProblems).length === 0 ? (
            <p className="text-gray-400">No active problems currently.</p>
          ) : (
            <div className="grid gap-3">
              {Object.entries(activeProblems).map(([id, count]) => (
                <div
                  key={id}
                  onClick={() => navigate(`/chat/${id}`, { state: { problemTitle: id } })}
                  className="flex justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                >
                  <span>Problem {id}</span>
                  <span className="text-blue-400">👥 {count} Online</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSelection;
