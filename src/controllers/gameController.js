const Game = require('../models/Game');

async function getAllGames(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const total = await Game.countDocuments();
    const games = await Game.find().sort({ fechaAgregado: -1 }).skip(skip).limit(limit);
    const pages = Math.max(Math.ceil(total / limit), 1);
    res.json({ success: true, data: games, meta: { page, limit, total, pages } });
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
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const filter = { titulo: { $regex: q, $options: 'i' } };
    const total = await Game.countDocuments(filter);
    const games = await Game.find(filter).sort({ fechaAgregado: -1 }).skip(skip).limit(limit);
    const pages = Math.max(Math.ceil(total / limit), 1);
    res.json({ success: true, data: games, meta: { page, limit, total, pages } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function filterGames(req, res) {
  try {
    const { plataforma, genero } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const filter = {};
    if (plataforma) filter.plataforma = plataforma;
    if (genero) filter.genero = genero;
    const total = await Game.countDocuments(filter);
    const games = await Game.find(filter).sort({ fechaAgregado: -1 }).skip(skip).limit(limit);
    const pages = Math.max(Math.ceil(total / limit), 1);
    res.json({ success: true, data: games, meta: { page, limit, total, pages } });
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