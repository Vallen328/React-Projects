import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold text-white">iTask</div>
        <ul className="flex space-x-6">
          <li className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
            Home
          </li>
          <li className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
            Your tasks
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
