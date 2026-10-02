import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  difficulty: { type: String, default: 'medium' },
  equipment: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
});

const Workout = model('Workout', workoutSchema);

export default Workout;
