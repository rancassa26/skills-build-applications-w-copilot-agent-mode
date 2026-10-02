import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  members: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
});

const Team = model('Team', teamSchema);

export default Team;
