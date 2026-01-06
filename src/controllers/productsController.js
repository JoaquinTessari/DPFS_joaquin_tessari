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
    // Root - Show all products
    index: (req, res) => {
        const products = getProducts();
        res.render('index', { products, isHome: false });
    },

    // By Category
    listByCategory: (req, res) => {
        const products = getProducts();
        const category = req.params.category;
        const filteredProducts = products.filter(p => p.category === category);
        res.render('index', { products: filteredProducts, isHome: false });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (!product) return res.send('Producto no encontrado');
        res.render('products/detail', { product });
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('products/create');
    },

    // Create -  Method to store
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

    // Edit - Form to edit
    edit: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (!product) return res.send('Producto no encontrado');
        res.render('products/edit', { product });
    },

    // Update - Method to update
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
                // Only update image if a new one is uploaded
                image: req.file ? `/images/${req.file.filename}` : products[index].image,
                // Assuming colors are also editable but the form might need adjustment or we just process text again
                colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : products[index].colors
            };
            saveProducts(products);
            res.redirect(`/products/${req.params.id}`);
        } else {
            res.send('Producto no encontrado');
        }
    },

    // Delete - Delete one product from DB
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
