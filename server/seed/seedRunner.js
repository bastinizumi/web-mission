import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/db.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Faq from '../models/Faq.js';
import { SERVICES_SEED, PROJECTS_SEED, FAQS_SEED } from './seedData.js';

dotenv.config();

async function run() {
  await connectDB();
  await Promise.all([Service.deleteMany({}), Project.deleteMany({}), Faq.deleteMany({})]);
  await Service.insertMany(SERVICES_SEED);
  await Project.insertMany(PROJECTS_SEED);
  await Faq.insertMany(FAQS_SEED);
  console.log('[SEED] Database freshly seeded.');
  await disconnectDB();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

