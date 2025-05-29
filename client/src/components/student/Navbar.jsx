import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
  try {
    if (isEducator) {
      navigate("/educator");
      return;
    }

    const token = await getToken();
    const { data } = await axios.get(backendUrl + "/api/educator/update-role", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setIsEducator(true);
      toast.success(data.message);
      // Navigate after role is successfully updated
      navigate("/educator");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 transition-colors duration-300 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.eduStack_logo}
        alt="EduStack Logo"
        className="w-28 lg:w-40 cursor-pointer transition-transform hover:scale-105"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-gray-700">
        {user && (
          <>
            <button
              onClick={becomeEducator}
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <span className="text-gray-400 select-none">|</span>
            <Link
              to="/my-enrollments"
              className="text-blue-600 hover:text-blue-800 transition font-medium"
            >
              My Enrollments
            </Link>
          </>
        )}
      </div>

      {/* User Button / Auth */}
      <div className="hidden md:flex items-center">
        {user ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-full",
                userButtonTrigger: "focus:outline-none",
              },
            }}
          />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-full text-white font-semibold shadow-md"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden items-center gap-4 text-gray-700">
        {user ? (
          <>
            <button
              onClick={becomeEducator}
              className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              {isEducator ? "Educator" : "Become Educator"}
            </button>
            <Link
              to="/my-enrollments"
              className="text-sm text-blue-600 hover:text-blue-800 transition font-medium"
            >
              Enrollments
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 rounded-full",
                  userButtonTrigger: "focus:outline-none",
                },
              }}
            />
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="p-2 rounded-full hover:bg-blue-100 transition"
            aria-label="Sign In"
          >
            <img src={assets.user_icon} alt="User icon" className="w-6 h-6" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
