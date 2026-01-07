const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Rutas
const productsRouter = require('./src/routes/products');
const usersRouter = require('./src/routes/users');

// Middlewares personalizados
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
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

const db = require('./src/database/models');

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
    db.Product.findAll({
        include: ['brand', 'category']
    })
        .then(products => {
            res.render('index', { products, isHome: true });
        })
        .catch(error => res.send(error));
});

// Rutas de Usuario
app.use('/users', usersRouter);
app.use('/api/users', require('./src/routes/api/users'));

// Rutas de Productos
app.use('/products', productsRouter);
app.use('/api/products', require('./src/routes/api/products'));

// Rutas de Ordenes
const ordersRouter = require('./src/routes/orders');
app.use('/orders', ordersRouter);

// Rutas del Carrito
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render('cart', { cart, total });
});

app.post('/cart/add/:id', (req, res) => {
    const productId = req.params.id;
    db.Product.findByPk(productId, {
        include: ['brand', 'category']
    })
        .then(product => {
            if (product) {
                if (!req.session.cart) {
                    req.session.cart = [];
                }

                // Product is Sequelize instance, convert to plain
                let productData = product.get({ plain: true });

                const existingItem = req.session.cart.find(item => item.id == productId);
                if (existingItem) {
                    existingItem.quantity += parseInt(req.body.quantity) || 1;
                } else {
                    req.session.cart.push({ ...productData, quantity: parseInt(req.body.quantity) || 1 });
                }
            }
            res.redirect('/cart');
        })
        .catch(error => res.send(error));
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


