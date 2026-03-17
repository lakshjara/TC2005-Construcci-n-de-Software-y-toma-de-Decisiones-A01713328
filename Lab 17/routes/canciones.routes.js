const express = require('express');
const router = express.Router();
const cancionesController = require('../controllers/canciones.controller');

router.get('/', cancionesController.get_list);
router.get('/new', cancionesController.get_new);
router.post('/new', cancionesController.post_new);
router.post('/delete', cancionesController.post_delete);
router.get('/:cancion_id', cancionesController.get_detail);
router.get('/:cancion_id/edit', cancionesController.get_edit);
router.post('/:cancion_id/edit', cancionesController.post_edit);

module.exports = router;