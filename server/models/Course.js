import mongoose from 'mongoose';

const { Schema } = mongoose;

// Lecture Schema
const lectureSchema = new Schema({
  lectureId: { type: String, required: [true, 'Lecture ID is required.'] },
  lectureTitle: { type: String, required: [true, 'Lecture title is required.'] },
  lectureDuration: { type: Number, required: [true, 'Lecture duration is required.'] },
  lectureUrl: { type: String, required: [true, 'Lecture video URL is required.'] },
  isPreviewFree: { type: Boolean, required: true, default: false },
  lectureOrder: { type: Number, required: true },
}, { _id: false });

// Chapter Schema
const chapterSchema = new Schema({
  chapterId: { type: String, required: [true, 'Chapter ID is required.'] },
  chapterOrder: { type: Number, required: true },
  chapterTitle: { type: String, required: [true, 'Chapter title is required.'] },
  chapterContent: [lectureSchema]
}, { _id: false });

// Course Schema
const courseSchema = new Schema({
  courseTitle: { type: String, required: [true, 'Course title is required.'] },
  courseDescription: { type: String, required: [true, 'Course description is required.'] },
  courseThumbnail: { type: String, default: '' },
  coursePrice: { type: Number, required: true, min: 0 },
  isPublished: { type: Boolean, required: true, default: false },
  discount: { type: Number, required: true, min: 0, max: 100, default: 0 },
  courseContent: [chapterSchema],
  courseRatings: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 }
    }
  ],
  educator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  enrolledStudents: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
