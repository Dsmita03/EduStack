import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { dummyCourses, assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
      if (data.success) setCourseData(data.courseData);
      else throw new Error(data.message);
    } catch (error) {
      console.warn("Fallback: ", error.message);
      const fallbackCourse = dummyCourses.find((c) => c._id === id);
      if (fallbackCourse) {
        setCourseData(fallbackCourse);
        toast.info("Loaded offline dummy data.");
      } else {
        toast.error("Course not found.");
      }
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) return toast.warn("Login to enroll.");
      if (isAlreadyEnrolled) return toast.info("You're already enrolled.");

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) window.location.replace(data.session_url);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!courseData) return <Loading />;

  return (
    <>
      <div className="relative md:px-36 px-6 pt-20 md:pt-32 bg-gradient-to-b from-cyan-50 via-white to-white min-h-screen text-left">
        {/* Wrapper */}
        <div className="flex flex-col-reverse md:flex-row gap-10 items-start">
          {/* Left Section */}
          <div className="w-full max-w-2xl text-gray-700">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{courseData.courseTitle}</h1>
            <p className="text-base leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }} />

            <div className="flex items-center gap-2 text-sm">
              <p>{calculateRating(courseData)}</p>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
              <p className="text-blue-600">({courseData.courseRatings.length} rating{courseData.courseRatings.length !== 1 && 's'})</p>
              <p className="text-gray-500">{courseData.enrolledStudents.length} student{courseData.enrolledStudents.length !== 1 && 's'}</p>
            </div>

            <p className="text-sm mt-1">By <span className="text-blue-500 underline">{courseData.educator.name}</span></p>

            {/* Course Chapters */}
            <div className="pt-8">
              <h2 className="text-xl font-semibold mb-4">Course Structure</h2>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border bg-white mb-3 rounded-lg shadow overflow-hidden">
                  <div
                    className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow"
                        className={`transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''} w-4`}
                      />
                      <p className="font-medium">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lecture{chapter.chapterContent.length !== 1 && 's'} - {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Lectures */}
                  <div className={`transition-all duration-300 ${openSections[index] ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden`}>
                    <ul className="px-6 py-2 text-sm">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="py-1 flex justify-between">
                          <div className="flex gap-2 items-start">
                            <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1" />
                            <p>{lecture.lectureTitle}</p>
                          </div>
                          <div className="flex gap-2 text-gray-500">
                            {lecture.isPreviewFree && (
                              <button
                                className="text-blue-600 underline"
                                onClick={() =>
                                  setPlayerData({ videoId: lecture.lectureUrl.split("/").pop() })
                                }
                              >
                                Preview
                              </button>
                            )}
                            <span>{humanizeDuration(lecture.lectureDuration * 60000, { units: ["h", "m"] })}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Description */}
            <div className="py-12">
              <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
              <div className="pt-3 rich-text text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full sm:max-w-md sticky top-24">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
            ) : (
              <img src={courseData.courseThumbnail} alt="thumbnail" className="w-full aspect-video object-cover" />
            )}

            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                <img src={assets.time_left_clock_icon} alt="clock" className="w-4 h-4" />
                <span><strong>5 days</strong> left at this price!</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-800">{currency}{(courseData.coursePrice * (1 - courseData.discount / 100)).toFixed(2)}</span>
                <span className="line-through text-gray-400">{currency}{courseData.coursePrice}</span>
                <span className="text-green-600">{courseData.discount}% off</span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <img src={assets.star} className="w-4" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.time_clock_icon} className="w-4" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.lesson_icon} className="w-4" />
                  <p>{calculateNoOfLectures(courseData)} lessons</p>
                </div>
              </div>

              <button
                onClick={enrollCourse}
                className={`mt-6 w-full py-3 text-white font-medium rounded transition hover:opacity-90 ${isAlreadyEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
                disabled={isAlreadyEnrolled}
              >
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <div className="pt-6 border-t mt-6 text-sm text-gray-700">
                <p className="font-semibold mb-2">What's in the course?</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Lifetime access & updates</li>
                  <li>Step-by-step projects</li>
                  <li>Downloadable resources</li>
                  <li>Quizzes & practice</li>
                  <li>Completion certificate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
