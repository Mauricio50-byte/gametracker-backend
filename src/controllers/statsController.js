const Game = require('../models/Game');

async function getSummary(req, res) {
  try {
    const totalGames = await Game.countDocuments();
    const completedGames = await Game.countDocuments({ completado: true });
    const hoursAgg = await Game.aggregate([{ $group: { _id: null, total: { $sum: { $ifNull: ['$horasJugadas', 0] } } } }]);
    const ratingAgg = await Game.aggregate([{ $group: { _id: null, avg: { $avg: { $ifNull: ['$puntuacion', null] } } } }]);
    const totalHours = hoursAgg[0]?.total || 0;
    const avgRating = ratingAgg[0]?.avg ? Number(ratingAgg[0].avg.toFixed(2)) : 0;
    const completionRate = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;
    res.json({ success: true, data: { totalGames, completedGames, totalHours, avgRating, completionRate } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function getByPlatform(req, res) {
  try {
    const agg = await Game.aggregate([
      { $group: { _id: '$plataforma', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const data = agg.map((x) => ({ platform: x._id, count: x.count }));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function getByGenre(req, res) {
  try {
    const agg = await Game.aggregate([
      { $group: { _id: '$genero', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const data = agg.map((x) => ({ genre: x._id, count: x.count }));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function getCompletionRate(req, res) {
  try {
    const totalGames = await Game.countDocuments();
    const completedGames = await Game.countDocuments({ completado: true });
    const completionRate = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;
    res.json({ success: true, data: { completionRate, totalGames, completedGames } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

module.exports = { getSummary, getByPlatform, getByGenre, getCompletionRate };