const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const cancionesController = require('../controllers/canciones.controller');

router.get('/', isAuth, cancionesController.get_list);
router.get('/new', isAuth, cancionesController.get_new);
router.post('/new', isAuth, cancionesController.post_new);
router.post('/delete', isAuth, cancionesController.post_delete);
router.get('/:cancion_id', isAuth, cancionesController.get_detail);
router.get('/:cancion_id/edit', isAuth, cancionesController.get_edit);
router.post('/:cancion_id/edit', isAuth, cancionesController.post_edit);

module.exports = router;