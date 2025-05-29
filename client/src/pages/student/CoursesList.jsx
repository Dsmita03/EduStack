import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses)
    }
  }, [allCourses, input])

  return (
    <div className="relative px-6 md:px-24 pt-24 text-left min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 sticky top-0 z-10 bg-white/80 backdrop-blur-lg py-4 px-2 rounded-md shadow-md">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Explore Courses
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/')}
            >
              Home
            </span>{' '}
            /{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/course-list')}
            >
              Course List
            </span>
          </p>
        </div>
        <SearchBar data={input} />
      </div>

      {/* Filter Badge */}
      {input && (
        <div className="inline-flex items-center gap-3 px-4 py-2 border rounded-full bg-white text-gray-600 shadow-sm mb-6 ml-1 animate-fade-in">
          <span className="font-medium">{input}</span>
          <img
            src={assets.cross_icon}
            alt="clear"
            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate('/course-list')}
          />
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourse.length > 0 ? (
          filteredCourse.map((course, index) => (
            <div
              key={index}
              className="transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
            >
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-20">
            <p className="text-xl">No courses found for "{input}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesList
