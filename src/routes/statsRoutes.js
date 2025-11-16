const { Router } = require('express');
const ctrl = require('../controllers/statsController');

const router = Router();

router.get('/summary', ctrl.getSummary);
router.get('/by-platform', ctrl.getByPlatform);
router.get('/by-genre', ctrl.getByGenre);
router.get('/completion-rate', ctrl.getCompletionRate);

module.exports = router;