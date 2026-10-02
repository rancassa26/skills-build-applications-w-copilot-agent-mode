import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  fitnessLevel: { type: String, default: 'beginner' },
  createdAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

export default User;
