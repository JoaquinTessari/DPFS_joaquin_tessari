const db = require('../../database/models');

const productsAPIController = {
    list: (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        db.Product.findAndCountAll({
            include: ['category'],
            order: [['id', 'DESC']],
            limit: limit,
            offset: offset
        })
            .then(({ count, rows }) => {
                let countByCategory = {};

                db.Product.findAll({
                    include: ['category']
                }).then(allProducts => {
                    allProducts.forEach(product => {
                        if (product.category) {
                            if (!countByCategory[product.category.name]) {
                                countByCategory[product.category.name] = 0;
                            }
                            countByCategory[product.category.name]++;
                        }
                    });

                    let next = null;
                    let previous = null;
                    if (count > page * limit) {
                        next = `/api/products/?page=${page + 1}`;
                    }
                    if (page > 1) {
                        previous = `/api/products/?page=${page - 1}`;
                    }

                    let respuesta = {
                        meta: {
                            status: 200,
                            total: count,
                            countByCategory: countByCategory,
                            url: 'api/products',
                            next: next,
                            previous: previous
                        },
                        data: rows.map(product => {
                            return {
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                category: product.category,
                                detail: `/api/products/${product.id}`
                            }
                        })
                    }
                    res.json(respuesta);
                });
            })
            .catch(error => res.json(error));
    },
    latest: (req, res) => {
        db.Product.findOne({
            order: [['id', 'DESC']],
            include: ['brand', 'category', 'colors']
        })
            .then(product => {
                if (product) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: `/api/products/latest`
                        },
                        data: {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            image: `/images/${product.image}`,
                            brand: product.brand,
                            category: product.category,
                            colors: product.colors,
                            detail: `/api/products/${product.id}`
                        }
                    }
                    res.json(respuesta);
                } else {
                    res.status(404).json({ meta: { status: 404 }, data: "No products found" });
                }
            })
            .catch(error => res.json(error));
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['brand', 'category', 'colors']
        })
            .then(product => {
                if (product) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: `/api/products/${product.id}`
                        },
                        data: {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            image: `/images/${product.image}`,
                            brand: product.brand,
                            category: product.category,
                            colors: product.colors
                        }
                    }
                    res.json(respuesta);
                } else {
                    res.status(404).json({ meta: { status: 404 }, data: "Product not found" });
                }
            })
            .catch(error => res.json(error));
    }
}

module.exports = productsAPIController;
