// pages/ProblemSelection.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = "https://buddymatcher-node.onrender.com"
const ProblemSelection = () => {
  const navigate = useNavigate();
  useEffect(() => {
      
      const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        try {
          const res = await fetch(`${BACKEND_URL}/auth/protect`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            console.error("JWT verification failed");
            navigate("/login");
            return;
          }

          const userString = localStorage.getItem("user");
          if (!userString) {
            console.error("No user data found in localStorage");
            navigate("/login");
            return;
          }

          let username = null;
          try {
            const user = JSON.parse(userString);
            username = user.username;
            if (!username) {
              console.error("Username not found in user object");
              navigate("/login");
              return;
            }
          } catch (err) {
            console.error("Failed to parse user from localStorage", err);
            navigate("/login");
            return;
          }

          console.log("Fetching user data for:", username);
          const userRes = await fetch(`${BACKEND_URL}/problems/user/${username}`);
          const userJson = await userRes.json();

          if (userRes.ok) {
            setUserDetails(userJson);
          } else {
            console.error("Failed to fetch user details", userJson);
          }
        } catch (err) {
          console.error("Fetch failed", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [navigate]);


  const [problemId, setProblemId] = useState("");
  const [activeProblems, setActiveProblems] = useState({});

  const fetchActiveProblems = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/problems/show`);
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
