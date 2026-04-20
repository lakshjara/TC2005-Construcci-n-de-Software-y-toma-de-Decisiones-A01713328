const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const mapaController = require('../controllers/mapa.controller');

router.get('/', isAuth, mapaController.get_mapa);

module.exports = router;