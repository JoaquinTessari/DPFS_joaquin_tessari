const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const multer = require('multer');
const path = require('path');

// Configuración de Multer (igual que en app.js, tal vez debería extraerse también pero por ahora lo duplicaré o importaré si es posible. Duplicar es más seguro por ahora para evitar problemas de contexto)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// /products

/*** OBTENER TODOS LOS PRODUCTOS ***/
router.get('/', productsController.index);

/*** OBTENER PRODUCTOS POR CATEGORÍA ***/
router.get('/category/:category', productsController.listByCategory);

/*** BUSCAR PRODUCTOS ***/
router.get('/search', productsController.search);

/*** CREAR UN PRODUCTO ***/
router.get('/create', adminMiddleware, productsController.create);
router.post('/', adminMiddleware, upload.single('image'), productsController.store);


/*** OBTENER UN PRODUCTO ***/
router.get('/:id', productsController.detail);

/*** EDITAR UN PRODUCTO ***/
router.get('/:id/edit', adminMiddleware, productsController.edit);
router.put('/:id', adminMiddleware, upload.single('image'), productsController.update);


/*** ELIMINAR UN PRODUCTO ***/
router.delete('/:id', adminMiddleware, productsController.destroy);


module.exports = router;
