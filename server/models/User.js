import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Clerk user ID as string
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email address']
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    },
    role: {
      type: String,
      enum: ['student', 'educator'],
      default: 'student'
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
