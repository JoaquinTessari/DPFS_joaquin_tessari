const { body } = require('express-validator');
const path = require('path');
const db = require('../database/models');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('Tienes que escribir un nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Tienes que escribir un apellido').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido').bail()
        .custom((value, { req }) => {
            return db.User.findOne({
                where: { email: value }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('Este email ya está registrado');
                    }
                });
        }),
    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];
