import React from "react";

const HeroSection = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=futuristic%20digital%20network%20visualization%20with%20glowing%20blue%20particles%20and%20connecting%20lines%20on%20dark%20background%2C%20abstract%20technology%20concept%2C%20modern%20minimalist%20style%2C%20deep%20navy%20background&width=1440&height=900&seq=1&orientation=landscape"
          className="w-full h-full object-cover object-center opacity-40"
          alt="Background"
        />
      </div> */}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Code Together, Grow Together
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Find your perfect coding partner and solve LeetCode problems
          together in real-time. Level up your problem-solving skills through
          collaboration.
        </p>
        <button className="px-12 py-4 rounded-lg text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-blue-500/50">
          Get Started
        </button>
      </div>
    </main>
  );
};

export default HeroSection;