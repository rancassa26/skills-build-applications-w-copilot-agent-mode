import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';
import { connectDatabase } from '../config/database.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany([
      { username: 'mona', email: 'mona@example.com', name: 'Mona', fitnessLevel: 'advanced' },
      { username: 'liam', email: 'liam@example.com', name: 'Liam', fitnessLevel: 'intermediate' },
    ]);

    await Team.insertMany([
      { name: 'OctoStrong', description: 'Endurance and strength training crew', members: ['mona', 'liam'] },
      { name: 'Sunrise Runners', description: 'Morning running club', members: ['mona'] },
    ]);

    await Activity.insertMany([
      { type: 'Run', duration: 35, calories: 320, user: 'mona', date: new Date('2026-10-01') },
      { type: 'Cycling', duration: 45, calories: 410, user: 'liam', date: new Date('2026-10-02') },
    ]);

    await Leaderboard.insertMany([
      { user: 'mona', score: 980, rank: 1 },
      { user: 'liam', score: 900, rank: 2 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Circuit', type: 'strength', duration: 30, difficulty: 'medium', equipment: ['dumbbells', 'mat'] },
      { name: 'Trail Run', type: 'cardio', duration: 40, difficulty: 'hard', equipment: ['shoes'] },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
