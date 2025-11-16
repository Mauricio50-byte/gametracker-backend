const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'gametracker';
  if (!uri) return false;
  try {
    await mongoose.connect(uri, { dbName });
    return true;
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    return false;
  }
}

module.exports = { connectDatabase };