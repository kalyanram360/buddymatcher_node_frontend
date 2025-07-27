import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    // Mock user data - replace with actual user data from your auth context/state
    const user = {
        name: "John Doe",
        profilePic: "https://via.placeholder.com/50x50/4F46E5/ffffff?text=JD"
    };

    const menuItems = [
        {
            path: "/profile",
            label: "Profile",
            icon: "fas fa-user"
        },
        {
            path: "/match",
            label: "Find Coding Partner",
            icon: "fas fa-search"
        },
        {
            path: "",
            label: "Friends",
            icon: "fas fa-users"
        }
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-[#0F1419] border-r border-gray-800 z-40">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <i className="fas fa-code text-2xl text-blue-400"></i>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        CodeMatch
                    </span>
                </div>
            </div>

            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <img
                        src={user.profilePic}
                        alt="Profile"
                        className="w-12 h-12 rounded-full ring-2 ring-blue-400/30"
                    />
                    <div>
                        <h3 className="text-white font-semibold text-sm">{user.name}</h3>
                        <p className="text-gray-400 text-xs">@{user.name.toLowerCase().replace(' ', '')}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    location.pathname === item.path
                                        ? "bg-blue-500/20 text-blue-400 border-l-4 border-blue-400"
                                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                                }`}
                            >
                                <i className={`${item.icon} w-5 text-center`}></i>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-gray-800">
                <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full">
                    <i className="fas fa-sign-out-alt w-5 text-center"></i>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;