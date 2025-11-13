const { Router } = require('express');
const ctrl = require('../controllers/reviewController');

const router = Router();

router.get('/', ctrl.getAllReviews);
router.get('/:id', ctrl.getReviewById);
router.get('/game/:juegoId', ctrl.getReviewsByGame);
router.post('/', ctrl.createReview);
router.put('/:id', ctrl.updateReview);
router.delete('/:id', ctrl.deleteReview);

module.exports = router;