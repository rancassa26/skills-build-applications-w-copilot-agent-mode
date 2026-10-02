import express from 'express';
import db, { connectDatabase } from './config/database.js';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

await connectDatabase();

app.get('/api/', (_request, response) => {
  response.json({ baseUrl });
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/users/', async (_request, response) => {
  const users = await User.find();
  response.json(users);
});

app.get('/api/teams/', async (_request, response) => {
  const teams = await Team.find();
  response.json(teams);
});

app.get('/api/activities/', async (_request, response) => {
  const activities = await Activity.find();
  response.json(activities);
});

app.get('/api/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ score: -1 });
  response.json(leaderboard);
});

app.get('/api/workouts/', async (_request, response) => {
  const workouts = await Workout.find();
  response.json(workouts);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});

export { app, baseUrl };