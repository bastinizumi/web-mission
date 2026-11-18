import mongoose from 'mongoose';

let dbConnected = false;

/**
 * Connects to MongoDB via MONGO_URI (or local mongodb://127.0.0.1:27017/webmission).
 * If no MongoDB daemon is running locally, marks dbConnected=false so the Express
 * API seamlessly falls back to the local JSON data store + seeded catalog.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI?.trim() || 'mongodb://127.0.0.1:27017/webmission';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    dbConnected = true;
    console.log(`[DB] Connected to MongoDB: ${conn.connection.host}`);
    return true;
  } catch (err) {
    dbConnected = false;
    console.warn(
      `[DB] MongoDB not reachable (${err.message}). Running with seeded local persistence store (set MONGO_URI in server/.env for external MongoDB).`
    );
    return false;
  }
}

export function isDBConnected() {
  return dbConnected && mongoose.connection.readyState === 1;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  dbConnected = false;
}
