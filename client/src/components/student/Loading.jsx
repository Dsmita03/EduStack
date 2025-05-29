import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [path, navigate]); // ✅ Add dependencies

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4'>
      <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-6'></div>
      <h2 className='text-xl sm:text-2xl font-semibold text-gray-700 mb-2'>Redirecting...</h2>
      <p className='text-gray-500 text-sm sm:text-base'>
        Please wait while we take you to the requested page.
      </p>
      <p className='text-xs text-gray-400 mt-1'>You will be redirected in 5 seconds</p>
    </div>
  );
};

export default Loading;
