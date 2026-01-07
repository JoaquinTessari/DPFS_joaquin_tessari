const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsController');

// Listado de productos
router.get('/', productsAPIController.list);
// Último producto
router.get('/latest', productsAPIController.latest);
// Detalle de producto
router.get('/:id', productsAPIController.detail);

module.exports = router;
