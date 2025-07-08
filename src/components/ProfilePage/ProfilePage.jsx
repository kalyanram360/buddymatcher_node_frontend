// import React from "react";


// useEffect(() => {
//   const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await fetch("/api/auth/me", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (res.ok) {
//       // setUser(data); // success: show profile
//     } else {
//       console.error(data.message); // invalid/expired token
//       // optionally redirect to login
//     }
//   };

//   // fetchUser();
// }, []);


// const ProfilePage = () => {
//   // Simulated user data
//   const user = {
//     username: "kalyan_dev",
//     email: "kalyan@example.com",
//     avatar: "https://i.pravatar.cc/150?img=13", // fake avatar
//     friends: [
//       { name: "Arjun", avatar: "https://i.pravatar.cc/150?img=32" },
//       { name: "Priya", avatar: "https://i.pravatar.cc/150?img=45" },
//       { name: "Dev", avatar: "https://i.pravatar.cc/150?img=12" },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       {/* Profile Header */}
//       <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 flex items-center gap-6 mb-10">
//         <img
//           src={user.avatar}
//           alt="profile"
//           className="w-24 h-24 rounded-full border-4 border-blue-500"
//         />
//         <div>
//           <h2 className="text-3xl font-bold">{user.username}</h2>
//           <p className="text-gray-400">{user.email}</p>
//         </div>
//       </div>

//       {/* Friends List */}
//       <div className="max-w-4xl mx-auto">
//         <h3 className="text-2xl font-semibold mb-4">Coding Buddies</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {user.friends.map((friend, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 hover:bg-gray-700 transition"
//             >
//               <img
//                 src={friend.avatar}
//                 alt={friend.name}
//                 className="w-12 h-12 rounded-full"
//               />
//               <span className="text-lg">{friend.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Additional section: optional */}
//       <div className="max-w-4xl mx-auto mt-10">
//         <h3 className="text-xl font-semibold mb-2">Upcoming Match</h3>
//         <div className="bg-gray-800 p-4 rounded-lg">
//           <p className="text-gray-300">You’re matched with <strong>Arjun</strong> to solve <em>“Longest Palindromic Substring”</em> today at 7:00 PM.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


// useEffect(() => {
//   const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await fetch("/api/auth/me", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setUser(data); // success: show profile
//     } else {
//       console.error(data.message); // invalid/expired token
//       // optionally redirect to login
//     }
//   };

//   fetchUser();
// }, []);


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/auth/protect", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("JWT verification failed");
        navigate("/login"); // Redirect if token is invalid
      }
    };

    fetchUser(); // ✅ call this
  }, [navigate]);

  // Simulated dummy user data (for UI only)
  const user = {
    username: "kalyan_dev",
    email: "kalyan@example.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    friends: [
      { name: "Arjun", avatar: "https://i.pravatar.cc/150?img=32" },
      { name: "Priya", avatar: "https://i.pravatar.cc/150?img=45" },
      { name: "Dev", avatar: "https://i.pravatar.cc/150?img=12" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 flex items-center gap-6 mb-10">
        <img
          src={user.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Friends List */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Coding Buddies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {user.friends.map((friend, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 hover:bg-gray-700 transition"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-lg">{friend.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 