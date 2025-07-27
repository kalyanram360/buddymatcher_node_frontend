// import React from "react";

// const HeroSection = () => {
//   return (
//     <main className="relative min-h-screen flex items-center justify-center overflow-hidden">


//       <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//         <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//           Code Together, Grow Together
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-300 mb-12">
//           Find your perfect coding partner and solve LeetCode problems
//           together in real-time. Level up your problem-solving skills through
//           collaboration.
//         </p>
//         <button className="px-12 py-4 rounded-lg text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-blue-500/50">
//           Get Started
//         </button>
//       </div>
//     </main>
//   );
// };

// export default HeroSection;


import React from "react";

const HeroSection = () => {
  return (
    <main className="relative min-h-screen bg-[#0A1929] text-white flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Code Together, Grow Together
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12">
          Find your perfect coding partner and solve LeetCode problems
          together in real-time. Level up your problem-solving skills through
          collaboration.
        </p>
        <button className="px-12 py-4 rounded-lg text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-blue-500/50 font-semibold">
          Get Started
        </button>
      </div>
    </main>
  );
};

export default HeroSection;