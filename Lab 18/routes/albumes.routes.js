const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const albumesController = require('../controllers/albumes.controller');

router.get('/', isAuth, albumesController.get_list);
router.get('/new', isAuth, albumesController.get_new);
router.post('/new', isAuth, albumesController.post_new);
router.get('/:album_id', isAuth, albumesController.get_detail);
router.get('/:album_id/edit', isAuth, albumesController.get_edit);
router.post('/:album_id/edit', isAuth, albumesController.post_edit);

module.exports = router;