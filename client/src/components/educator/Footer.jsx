import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-blue-900 px-8 py-6 flex flex-col md:flex-row items-center justify-between w-full border-t border-blue-300">
      <div className="flex items-center gap-6">
        <img
          className="hidden md:block w-24 transition-transform duration-300 hover:scale-110"
          src={assets.eduStack_logo}
          alt="EduStack Logo"
        />
        <div className="hidden md:block h-8 w-px bg-blue-500/40"></div>
        <p className="text-center text-xs md:text-sm text-blue-900/80 select-none">
          © 2025 EduStack. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-6 mt-6 md:mt-0">
        <a
          href="#"
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          aria-label="Facebook"
        >
          <img
            className="w-6 h-6 filter brightness-90 hover:brightness-110 transition"
            src={assets.facebook_icon}
            alt="Facebook"
          />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          aria-label="Twitter"
        >
          <img
            className="w-6 h-6 filter brightness-90 hover:brightness-110 transition"
            src={assets.twitter_icon}
            alt="Twitter"
          />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          aria-label="Instagram"
        >
          <img
            className="w-6 h-6 filter brightness-90 hover:brightness-110 transition"
            src={assets.instagram_icon}
            alt="Instagram"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
