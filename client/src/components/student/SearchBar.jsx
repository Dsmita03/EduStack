import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/course-list/${input.trim()}`);
    } else {
      navigate('/course-list');
    }
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="w-full flex items-center bg-white/60 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-4 py-2 md:py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500"
    >
      {/* Search Icon */}
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="w-5 h-5 md:w-6 md:h-6 mx-2 opacity-60"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search for courses"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow text-sm md:text-base text-gray-700 placeholder-gray-400 bg-transparent outline-none px-2"
      />

      {/* Button */}
      <button
        type="submit"
        className="ml-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm md:text-base px-4 md:px-6 py-2 rounded-full font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
