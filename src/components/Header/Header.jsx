import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0A1929]/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-code text-2xl text-blue-400"></i>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CodeMatch
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 rounded-lg text-blue-400 border border-blue-400 hover:bg-blue-400/10 transition-colors duration-300 cursor-pointer whitespace-nowrap">
            Log In
          </button>
          <button className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer whitespace-nowrap">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;