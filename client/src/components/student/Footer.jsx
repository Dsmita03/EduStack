import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 px-6 w-full mt-10 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-10 py-12 border-b border-white/20">
        {/* Logo and Tagline */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <img src={assets.edustack_logo_dark} alt="EduStack Logo" className="w-40 mx-auto md:mx-0" />
          <p className="mt-6 text-sm text-white/80 leading-relaxed">
            EduStack empowers you with real-world skills to learn, grow, and succeed.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <ul className="text-sm space-y-2 text-white/80">
            {["Home", "About us", "Contact us", "Privacy policy"].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/70 mb-4 text-center md:text-left">
            Get the latest news, articles, and resources delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-64 px-3 py-2 rounded-md text-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="w-full sm:w-28 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-center text-xs text-white/50">
        © 2025 EduStack. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
