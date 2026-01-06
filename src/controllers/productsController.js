const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/products.json');

const getProducts = () => {
    try {
        const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
};

const saveProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const controller = {
    // Raíz - Mostrar todos los productos
    index: (req, res) => {
        const products = getProducts();
        res.render('index', { products, isHome: false });
    },

    // Por Categoría
    listByCategory: (req, res) => {
        const products = getProducts();
        const category = req.params.category;
        const filteredProducts = products.filter(p => p.category === category);
        res.render('index', { products: filteredProducts, isHome: false });
    },

    // Buscar
    search: (req, res) => {
        const query = req.query.q || '';
        const products = getProducts();
        const results = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
        );

        if (results.length > 0) {
            res.render('index', { products: results, isHome: false, query });
        } else {
            // Obtener 4 productos aleatorios como recomendaciones
            const recommendations = [...products]
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            res.render('products/no-results', { query, recommendations });
        }
    },

    // Detalle - Detalle de un producto
    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (!product) return res.send('Producto no encontrado');
        res.render('products/detail', { product });
    },

    // Crear - Formulario para crear
    create: (req, res) => {
        res.render('products/create');
    },

    // Crear - Método para guardar
    store: (req, res) => {
        const products = getProducts();
        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            category: req.body.category,
            colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : [],
            image: req.file ? `/images/${req.file.filename}` : '/images/default.jpg'
        };
        products.push(newProduct);
        saveProducts(products);
        res.redirect('/products');
    },

    // Editar - Formulario para editar
    edit: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (!product) return res.send('Producto no encontrado');
        res.render('products/edit', { product });
    },

    // Actualizar - Método para actualizar
    update: (req, res) => {
        const products = getProducts();
        const index = products.findIndex(p => p.id == req.params.id);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name: req.body.name,
                price: parseFloat(req.body.price),
                description: req.body.description,
                category: req.body.category,
                // Solo actualizar la imagen si se sube una nueva
                image: req.file ? `/images/${req.file.filename}` : products[index].image,
                // Asumiendo que los colores también son editables pero el formulario podría necesitar ajustes o simplemente procesamos el texto de nuevo
                colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : products[index].colors
            };
            saveProducts(products);
            res.redirect(`/products/${req.params.id}`);
        } else {
            res.send('Producto no encontrado');
        }
    },

    // Borrar - Borrar un producto de la BD
    destroy: (req, res) => {
        let products = getProducts();
        const productId = req.params.id;
        const index = products.findIndex(p => p.id == productId);

        if (index !== -1) {
            products.splice(index, 1);
            saveProducts(products);
            res.redirect('/products');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }
};

module.exports = controller;
