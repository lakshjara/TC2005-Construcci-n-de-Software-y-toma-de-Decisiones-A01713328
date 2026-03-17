const express = require('express');
const router = express.Router();
const albumesController = require('../controllers/albumes.controller');

router.get('/', albumesController.get_list);
router.get('/new', albumesController.get_new);
router.post('/new', albumesController.post_new);
router.get('/:album_id', albumesController.get_detail);
router.get('/:album_id/edit', albumesController.get_edit);
router.post('/:album_id/edit', albumesController.post_edit);

module.exports = router;