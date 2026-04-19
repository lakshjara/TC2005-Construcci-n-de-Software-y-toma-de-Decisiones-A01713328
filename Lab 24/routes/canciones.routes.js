const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canView = require('../util/can-view-canciones');
const canCreate = require('../util/can-create-canciones');
const canEdit = require('../util/can-edit-canciones');
const canDelete = require('../util/can-delete-canciones');
const cancionesController = require('../controllers/canciones.controller');

router.get('/', isAuth, canView, cancionesController.get_list);
router.get('/new', isAuth, canCreate, cancionesController.get_new);
router.post('/new', isAuth, canCreate, cancionesController.post_new);
router.post('/delete', isAuth, canDelete, cancionesController.post_delete);
router.get('/:cancion_id', isAuth, canView, cancionesController.get_detail);
router.post('/search-ajax', cancionesController.post_search_ajax);
router.get('/:cancion_id/edit', isAuth, canEdit, cancionesController.get_edit);
router.post('/:cancion_id/edit', isAuth, canEdit, cancionesController.post_edit);

module.exports = router;