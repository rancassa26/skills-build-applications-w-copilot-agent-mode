import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: String, required: true, trim: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, min: 1 },
  period: { type: String, default: 'weekly' },
});

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
