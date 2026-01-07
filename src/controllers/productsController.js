const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {
    // Raíz - Mostrar todos los productos
    index: (req, res) => {
        db.Product.findAll({
            include: ['brand', 'category']
        })
            .then(products => {
                res.render('index', { products, isHome: false });
            })
            .catch(error => res.send(error));
    },

    // Por Categoría
    listByCategory: (req, res) => {
        db.Product.findAll({
            include: [
                { association: 'brand' },
                {
                    association: 'category',
                    where: { name: req.params.category }
                }
            ]
        })
            .then(products => {
                // Si no encuentra nada por nombre exacto, intentar buscar por ID si fuera el caso, pero asumimos nombre
                res.render('index', { products, isHome: false });
            })
            .catch(error => res.send(error));
    },

    // Buscar
    search: (req, res) => {
        const query = req.query.q || '';
        db.Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            },
            include: ['brand', 'category']
        })
            .then(products => {
                if (products.length > 0) {
                    res.render('index', { products, isHome: false, query });
                } else {
                    // Obtener 4 productos aleatorios como recomendaciones
                    db.Product.findAll({
                        order: db.sequelize.random(),
                        limit: 4,
                        include: ['brand', 'category']
                    })
                        .then(recommendations => {
                            res.render('products/no-results', { query, recommendations });
                        });
                }
            })
            .catch(error => res.send(error));
    },

    // Detalle - Detalle de un producto
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['brand', 'category', 'colors']
        })
            .then(product => {
                if (!product) return res.send('Producto no encontrado');
                res.render('products/detail', { product });
            })
            .catch(error => res.send(error));
    },

    // Crear - Formulario para crear
    create: (req, res) => {
        // Necesitamos categorías para el select (si lo actualizamos). 
        // Por ahora enviamos a la vista, si la vista no lo usa no pasa nada.
        Promise.all([
            db.Category.findAll(),
            db.Brand.findAll()
        ])
            .then(([categories, brands]) => {
                res.render('products/create', { categories, brands });
            })
            .catch(error => res.send(error));
    },

    // Crear - Método para guardar
    store: (req, res) => {
        const categoryName = req.body.category;
        const newBrandName = req.body.new_brand;

        const categoryPromise = db.Category.findOne({
            where: { name: { [Op.like]: categoryName } }
        });

        const brandPromise = newBrandName ?
            db.Brand.findOrCreate({ where: { name: newBrandName }, defaults: { name: newBrandName } }) :
            Promise.resolve(null);

        Promise.all([categoryPromise, brandPromise])
            .then(([category, brandResult]) => {
                let categoryId = category ? category.id : null;

                let brandId = req.body.brand_id;
                if (brandResult) {
                    // brandResult is [instance, created]
                    brandId = brandResult[0].id;
                }

                return db.Product.create({
                    name: req.body.name,
                    price: parseFloat(req.body.price),
                    description: req.body.description,
                    category_id: categoryId,
                    brand_id: brandId,
                    image: req.file ? `/images/${req.file.filename}` : '/images/default.jpg'
                });
            })
            .then(product => {
                // Colores
                const colorsInput = req.body.colors; // "Negro, Blanco"
                if (colorsInput) {
                    const colorsArray = colorsInput.split(',').map(c => c.trim());
                    // Iterar y buscar/crear
                    const colorPromises = colorsArray.map(colorName => {
                        return db.Color.findOrCreate({
                            where: { name: colorName },
                            defaults: { name: colorName }
                        });
                    });

                    return Promise.all(colorPromises)
                        .then(results => {
                            // results es [[color, created], [color, created]]
                            const colorInstances = results.map(r => r[0]);
                            return product.setColors(colorInstances);
                        });
                }
            })
            .then(() => {
                res.redirect('/products');
            })
            .catch(error => res.send(error));
    },

    // Editar - Formulario para editar
    edit: (req, res) => {
        const productPromise = db.Product.findByPk(req.params.id, {
            include: ['colors', 'category', 'brand']
        });
        const categoriesPromise = db.Category.findAll();
        const brandsPromise = db.Brand.findAll();

        Promise.all([productPromise, categoriesPromise, brandsPromise])
            .then(([product, categories, brands]) => {
                if (!product) return res.send('Producto no encontrado');
                res.render('products/edit', { product, categories, brands });
            })
            .catch(error => res.send(error));
    },

    // Actualizar - Método para actualizar
    update: (req, res) => {
        const categoryName = req.body.category;
        const newBrandName = req.body.new_brand;

        const categoryPromise = db.Category.findOne({
            where: { name: { [Op.like]: categoryName } }
        });

        const brandPromise = newBrandName ?
            db.Brand.findOrCreate({ where: { name: newBrandName }, defaults: { name: newBrandName } }) :
            Promise.resolve(null);

        Promise.all([categoryPromise, brandPromise])
            .then(([category, brandResult]) => {
                let categoryId = category ? category.id : null;

                let brandId = req.body.brand_id;
                if (brandResult) {
                    brandId = brandResult[0].id;
                }

                let updateData = {
                    name: req.body.name,
                    price: parseFloat(req.body.price),
                    description: req.body.description,
                    category_id: categoryId,
                    brand_id: brandId,
                };
                if (req.file) {
                    updateData.image = `/images/${req.file.filename}`;
                }

                return db.Product.update(updateData, {
                    where: { id: req.params.id }
                });
            })
            .then(() => {
                // Actualizar colores
                return db.Product.findByPk(req.params.id);
            })
            .then(product => {
                const colorsInput = req.body.colors;
                if (colorsInput) {
                    const colorsArray = colorsInput.split(',').map(c => c.trim());
                    const colorPromises = colorsArray.map(colorName => {
                        return db.Color.findOrCreate({
                            where: { name: colorName },
                            defaults: { name: colorName }
                        });
                    });
                    return Promise.all(colorPromises)
                        .then(results => {
                            const colorInstances = results.map(r => r[0]);
                            return product.setColors(colorInstances);
                        });
                }
            })
            .then(() => {
                res.redirect(`/products/${req.params.id}`);
            })
            .catch(error => res.send(error));
    },

    // Borrar - Borrar un producto de la BD
    destroy: (req, res) => {
        db.Product.destroy({
            where: { id: req.params.id }
        })
            .then(() => {
                res.redirect('/products');
            })
            .catch(error => res.send(error));
    }
};

module.exports = controller;
