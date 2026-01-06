const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const isAdmin = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer config (same as in app.js, maybe should be extracted too but for now I'll duplicate or import if possible. Duplicating is safer for now to avoid context issues)
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

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** GET PRODUCTS BY CATEGORY ***/
router.get('/category/:category', productsController.listByCategory);

/*** CREATE ONE PRODUCT ***/
router.get('/create', isAdmin, productsController.create);
router.post('/', isAdmin, upload.single('image'), productsController.store);


/*** GET ONE PRODUCT ***/
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', isAdmin, productsController.edit);
router.put('/:id', isAdmin, upload.single('image'), productsController.update);


/*** DELETE ONE PRODUCT***/
router.delete('/:id', isAdmin, productsController.destroy);


module.exports = router;
