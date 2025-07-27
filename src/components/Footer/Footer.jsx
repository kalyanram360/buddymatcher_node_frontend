// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="border-t border-gray-800">
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <div className="flex space-x-6">
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               About
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               Contact
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               Terms
//             </a>
//           </div>
//           <div className="flex space-x-6">
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               <i className="fab fa-github text-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               <i className="fab fa-twitter text-xl"></i>
//             </a>
//             <a
//               href="#"
//               className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
//             >
//               <i className="fab fa-linkedin text-xl"></i>
//             </a>
//           </div>
//           <div className="text-gray-400">
//             © 2025 CodeMatch. All rights reserved.
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";


const Footer = () => {
  return (
    <footer className="bg-[#0A1929] text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Terms
            </a>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
          <div className="text-gray-400">
            © 2025 CodeMatch. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;