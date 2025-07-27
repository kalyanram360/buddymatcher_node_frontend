

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user_details, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/auth/protect", {
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
        const userRes = await fetch(`http://localhost:5000/problems/user/${username}`);
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

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error message if user data couldn't be loaded
  if (!user_details) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Failed to load profile</h2>
          <p className="text-gray-400 mb-4">Unable to fetch user details</p>
          <button 
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  console.log(user_details);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 flex items-center gap-6 mb-10">
        <img
          src="https://via.placeholder.com/50x50/4F46E5/ffffff?text=JD"
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-bold">{user_details.username || "Unknown User"}</h2>
          <p className="text-gray-400">{user_details.email || "No email provided"}</p>
        </div>
      </div>

      {/* Friends List */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Coding Buddies</h3>
        {user_details.friends && user_details.friends.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {user_details.friends.map((friend, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 hover:bg-gray-700 transition"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${friend}&background=6B7280&color=fff&size=48`}
                  alt={friend}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-lg">{friend}</span>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">👥</div>
            <p className="text-gray-400 text-lg">No coding buddies yet</p>
            <p className="text-gray-500 text-sm mt-2">Start connecting with other developers!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;