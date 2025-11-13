const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'gametracker';
  if (!uri) return;
  await mongoose.connect(uri, { dbName });
}

module.exports = { connectDatabase };