import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required.']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // changed from String to ObjectId
    ref: 'User',
    required: [true, 'User ID is required.']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
    min: [0, 'Amount must be positive.']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentIntentId: {
    type: String,
    default: null // Optional: helpful when integrating with Stripe
  }
}, {
  timestamps: true
});

export const Purchase = mongoose.model('Purchase', PurchaseSchema);
