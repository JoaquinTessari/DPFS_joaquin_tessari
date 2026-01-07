const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Controlador
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Validaciones
const validateRegister = require('../middlewares/validateRegister');
const validateLogin = require('../middlewares/validateLogin');

// Registro
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('image'), validateRegister, usersController.processRegister);

// Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.processLogin);

// Perfil
router.get('/profile', authMiddleware, usersController.profile);

// Cerrar sesión
router.get('/logout', usersController.logout);

module.exports = router;
