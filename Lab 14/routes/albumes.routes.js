const express = require('express');
const router = express.Router();

const albumesController = require('../controllers/albumes.controller');

router.get('/', albumesController.get_list);

router.get('/new', albumesController.get_new);

router.post('/new', albumesController.post_new);

module.exports = router;