import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="relative w-full text-center px-6 md:px-0 bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Decorative element */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200 via-white to-transparent"></div>

      <div className="flex flex-col items-center justify-center pt-24 md:pt-40 space-y-8 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight relative">
          True Wealth Lies in Knowledge —
          <br />
          <span className="text-blue-600 relative inline-block">
            Build Skills, Shape Futures, Transform Lives
            <img
              src={assets.sketch}
              alt="sketch"
              className="hidden md:block absolute -bottom-5 right-0 w-36"
            />
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Unlock your potential with expert-led courses designed to boost your skills and career. 
          Learn at your pace, from anywhere — with lifetime access and real-world results.
        </p>

        {/* Search */}
        <div className="w-full md:w-[70%] max-w-2xl">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
