import { mongoose, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username field is required'],
      lowercase: true,
      unique: true,
      index: true,
    },
    fullname: {
      type: String,
      required: [true, 'Fullname field is required'],
      uppercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
      minLength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'employee', 'manager'],
      default: 'employee',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
