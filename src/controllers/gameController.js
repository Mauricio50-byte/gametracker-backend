const Game = require('../models/Game');

async function getAllGames(req, res) {
  try {
    const games = await Game.find().sort({ fechaAgregado: -1 });
    res.json({ success: true, count: games.length, data: games });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function getGameById(req, res) {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: game });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error', error: error.message });
  }
}

async function createGame(req, res) {
  try {
    const game = await Game.create(req.body);
    res.status(201).json({ success: true, data: game });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error', error: error.message });
  }
}

async function updateGame(req, res) {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!game) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: game });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error', error: error.message });
  }
}

async function deleteGame(req, res) {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function searchGames(req, res) {
  try {
    const q = req.query.query || '';
    const games = await Game.find({ titulo: { $regex: q, $options: 'i' } });
    res.json({ success: true, count: games.length, data: games });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function filterGames(req, res) {
  try {
    const { plataforma, genero } = req.query;
    const filter = {};
    if (plataforma) filter.plataforma = plataforma;
    if (genero) filter.genero = genero;
    const games = await Game.find(filter);
    res.json({ success: true, count: games.length, data: games });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  searchGames,
  filterGames
};