import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Newbie',
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
