import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <section className="py-16 px-6 md:px-40 bg-white">
      <h2 className="text-3xl font-semibold text-gray-900 max-w-3xl mx-auto text-center">
        Learn from the best
      </h2>
      <p className="text-gray-600 text-center mt-3 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
        Explore our wide range of courses designed to help you achieve your career goals. Whether you're looking to enhance your skills,<br /> 
        dive into a new field, or get certified. Start your journey today and unlock endless possibilities!
      </p>

      <div 
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 md:my-16 my-10 px-4 md:px-0"
        style={{ animation: 'fadeInUp 0.5s ease forwards' }}
      >
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={course.id || index} course={course} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link 
          to={'/course-list'} 
          onClick={() => window.scrollTo(0, 0)} 
          className="inline-block px-12 py-3 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
        >
          Show all courses
        </Link>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CoursesSection;
