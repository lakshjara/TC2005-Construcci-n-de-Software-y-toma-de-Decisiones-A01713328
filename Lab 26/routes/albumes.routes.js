const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canView = require('../util/can-view-albumes');
const canCreate = require('../util/can-create-albumes');
const canEdit = require('../util/can-edit-albumes');
const albumesController = require('../controllers/albumes.controller');

router.get('/', isAuth, canView, albumesController.get_list);
router.get('/new', isAuth, canCreate, albumesController.get_new);
router.post('/new', isAuth, canCreate, albumesController.post_new);
router.get('/:album_id', isAuth, canView, albumesController.get_detail);
router.get('/:album_id/edit', isAuth, canEdit, albumesController.get_edit);
router.post('/:album_id/edit', isAuth, canEdit, albumesController.post_edit);

module.exports = router;