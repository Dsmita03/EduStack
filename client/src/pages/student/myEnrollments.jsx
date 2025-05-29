import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(false);

  const getCourseProgress = useCallback(async () => {
    try {
      setLoadingProgress(true);
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
      setLoadingProgress(false);
    } catch (error) {
      setLoadingProgress(false);
      toast.error(error.message);
    }
  }, [backendUrl, enrolledCourses, getToken, calculateNoOfLectures]);

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData, fetchUserEnrolledCourses]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses, getCourseProgress]);

  if (!userData) {
    return (
      <div className="md:px-36 px-8 pt-10 text-center">
        <h1 className="text-2xl font-semibold">Please log in to see your enrollments.</h1>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="md:px-36 px-8 pt-10 text-center">
        <h1 className="text-2xl font-semibold mb-4">My Enrollments</h1>
        <p className="text-gray-500">You have not enrolled in any courses yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>

        {loadingProgress ? (
          <p className="mt-6 text-center text-gray-600">Loading progress...</p>
        ) : (
          <table className="md:table-auto table-fixed w-full overflow-hidden border border-gray-500/20 mt-10">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Course</th>
                <th className="px-4 py-3 font-semibold truncate">Duration</th>
                <th className="px-4 py-3 font-semibold truncate">Completed</th>
                <th className="px-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index];
                const isCompleted =
                  progress &&
                  progress.totalLectures > 0 &&
                  progress.lectureCompleted === progress.totalLectures;
                const percentCompleted = progress
                  ? (progress.lectureCompleted * 100) / progress.totalLectures
                  : 0;

                return (
                  <tr key={course._id || index} className="border-b border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                      <img
                        src={course.courseThumbnail}
                        alt={`${course.courseTitle} thumbnail`}
                        className="w-14 sm:w-24 md:w-28"
                      />
                      <div className="flex-1">
                        <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                        <Line
                          strokeWidth={4}
                          trailWidth={4}
                          percent={percentCompleted}
                          strokeColor="#3b82f6"
                          className="rounded-full"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {calculateCourseDuration(course)}
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {progress
                        ? `${progress.lectureCompleted} / ${progress.totalLectures}`
                        : "0 / 0"}{" "}
                      <span>Lectures</span>
                    </td>
                    <td className="px-4 py-3 max-sm:text-right">
                      <button
                        className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-500 max-sm:text-xs text-white cursor-pointer"
                        onClick={() => navigate(`/player/${course._id}`)}
                      >
                        {isCompleted ? "Completed" : "On Going"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollments;
