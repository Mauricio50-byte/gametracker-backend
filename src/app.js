const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, db_connected: mongoose.connection.readyState === 1 });
});

module.exports = app;