import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  calories: { type: Number, default: 0 },
  user: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});

const Activity = model('Activity', activitySchema);

export default Activity;
