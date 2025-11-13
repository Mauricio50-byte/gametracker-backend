const { Router } = require('express');
const ctrl = require('../controllers/gameController');
const { validateGameCreate } = require('../middleware/validator');

const router = Router();

router.get('/', ctrl.getAllGames);
router.get('/search', ctrl.searchGames);
router.get('/filter', ctrl.filterGames);
router.get('/:id', ctrl.getGameById);
router.post('/', validateGameCreate, ctrl.createGame);
router.put('/:id', ctrl.updateGame);
router.delete('/:id', ctrl.deleteGame);

module.exports = router;