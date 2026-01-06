const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const fs = require('fs');
const cookieParser = require('cookie-parser');

// Rutas
const productsRouter = require('./src/routes/products');
const usersRouter = require('./src/routes/users');

// Middlewares personalizados
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Ayudantes para leer datos JSON
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
    next();
});

// Rutas Principales
app.get('/', (req, res) => {
    const products = getProducts();
    res.render('index', { products, isHome: true });
});

// Rutas de Usuario
app.use('/users', usersRouter);

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


