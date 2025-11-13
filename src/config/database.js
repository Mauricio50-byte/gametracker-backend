const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;
  await mongoose.connect(uri);
}

module.exports = { connectDatabase };