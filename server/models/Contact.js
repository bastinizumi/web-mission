import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },
    service: {
      type: String,
      required: [true, 'Please select a service'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 2500,
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'replied'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);

