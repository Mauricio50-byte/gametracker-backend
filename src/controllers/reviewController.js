const Review = require('../models/Review');

async function getAllReviews(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const total = await Review.countDocuments();
    const reviews = await Review.find().sort({ fechaCreacion: -1 }).skip(skip).limit(limit);
    const pages = Math.max(Math.ceil(total / limit), 1);
    res.json({ success: true, data: reviews, meta: { page, limit, total, pages } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function getReviewById(req, res) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error', error: error.message });
  }
}

async function getReviewsByGame(req, res) {
  try {
    const { juegoId } = req.params;
    const reviews = await Review.find({ juegoId }).sort({ fechaCreacion: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

async function createReview(req, res) {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error', error: error.message });
  }
}

async function updateReview(req, res) {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error', error: error.message });
  }
}

async function deleteReview(req, res) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
}

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByGame,
  createReview,
  updateReview,
  deleteReview
};