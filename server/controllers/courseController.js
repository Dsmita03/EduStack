import Course from "../models/Course.js";

// @desc Get all published courses
// @route GET /api/course/all
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select('-courseContent -enrolledStudents')
      .populate({
        path: 'educator',
        select: 'name email imageUrl' // Optional: to limit educator info
      });

    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get course by ID
// @route GET /api/course/:id
export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id).populate({
      path: 'educator',
      select: 'name email imageUrl'
    });

    if (!courseData) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Sanitize lecture URLs if isPreviewFree is false
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = ""; // Hides premium video content
        }
      });
    });

    res.status(200).json({ success: true, courseData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
