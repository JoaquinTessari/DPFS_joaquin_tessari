const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('name')
        .notEmpty().withMessage('Tienes que escribir un nombre del producto').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('price')
        .notEmpty().withMessage('Tienes que escribir un precio').bail()
        .isNumeric().withMessage('El precio debe ser un número'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        } else {
            // Optional: make image mandatory for creation but optional for update?
            // For now, let's say it's valid if empty (default image used in controller) or valid extension if present.
            // User requirement says "Deberá ser un archivo válido". Usually implies if uploaded.
        }
        return true;
    })
];
