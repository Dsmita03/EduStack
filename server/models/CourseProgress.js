import mongoose, { Schema } from 'mongoose';

const courseProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required.']
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required.']
  },
  completed: {
    type: Boolean,
    default: false
  },
  lectureCompleted: {
    type: [String], // or [{ lectureId: String }] if you need extra detail
    default: []
  }
}, {
  minimize: false,
  timestamps: true // adds createdAt and updatedAt
});

export const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);
