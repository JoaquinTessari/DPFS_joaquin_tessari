const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const fs = require('fs');

// Rutas
const productsRouter = require('./src/routes/products');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Helpers to read JSON data
const getUsers = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf-8'));
    } catch (e) { return []; }
};

const getProducts = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'data/products.json'), 'utf-8'));
    } catch (e) { return []; }
};

// Middlewares Globales
app.use((req, res, next) => {
    // Cantidad del carrito
    let totalQuantity = 0;
    if (req.session.cart) {
        totalQuantity = req.session.cart.reduce((acc, item) => acc + item.quantity, 0);
    }
    res.locals.totalQuantity = totalQuantity;

    // Sesión de usuario
    res.locals.user = req.session.user || null;
    next();
});

// Rutas Principales
app.get('/', (req, res) => {
    // Show last 4 products or just all products as "featured"
    const products = getProducts();
    res.render('index', { products, isHome: true });
});

// Rutas de Usuario
app.get('/users/register', (req, res) => {
    res.render('users/register');
});

app.get('/users/login', (req, res) => {
    res.render('users/login');
});

app.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.send('Credenciales inválidas');
    }
});

app.get('/users/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/users/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/users/login');
    res.render('users/profile');
});

// Rutas de Productos
app.use('/products', productsRouter);

// Rutas del Carrito
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render('cart', { cart, total });
});

app.post('/cart/add/:id', (req, res) => {
    const productId = req.params.id;
    const products = getProducts();
    const product = products.find(p => p.id == productId);

    if (product) {
        if (!req.session.cart) {
            req.session.cart = [];
        }

        const existingItem = req.session.cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += parseInt(req.body.quantity) || 1;
        } else {
            req.session.cart.push({ ...product, quantity: parseInt(req.body.quantity) || 1 });
        }
    }
    res.redirect('/cart');
});

app.post('/cart/remove/:id', (req, res) => {
    const productId = req.params.id;
    const qty = parseInt(req.body.quantity) || 1;
    if (req.session.cart) {
        const item = req.session.cart.find(i => i.id == productId);
        if (item) {
            item.quantity -= qty;
            if (item.quantity <= 0) {
                req.session.cart = req.session.cart.filter(i => i.id != productId);
            }
        }
    }
    res.redirect('/cart');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

