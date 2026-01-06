const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const multer = require('multer');

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

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

// Datos de prueba (Mock)
const products = [
    { id: 1, name: 'Notebook Gamer X500', price: 850000, image: '/images/notebook.jpg', description: 'Potente notebook para gaming.', category: 'computacion' },
    { id: 2, name: 'Auriculares BT', price: 45000, image: '/images/headphones.jpg', description: 'Auriculares inalámbricos de alta calidad.', category: 'audio' },
    { id: 3, name: 'Monitor 24" IPS', price: 210000, image: '/images/monitor.jpg', description: 'Monitor Full HD con panel IPS.', category: 'computacion' },
    { id: 4, name: 'Teclado Mecánico', price: 65000, image: '/images/keyboard.jpg', description: 'Teclado mecánico retroiluminado.', category: 'gaming' },
    { id: 5, name: 'Mouse Gamer RGB', price: 25000, image: '/images/mouse.jpg', description: 'Mouse con sensor óptico.', category: 'ofertas' }
];

const users = [
    { id: 1, email: 'admin@admin.com', password: 'admin', role: 'admin' }
];

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

// Middleware de Autenticación
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.redirect('/users/login');
};

// Rutas Principales
app.get('/', (req, res) => {
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
app.get('/products', (req, res) => {
    res.render('index', { products, isHome: false });
});

app.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredProducts = products.filter(p => p.category === category);
    res.render('index', { products: filteredProducts, isHome: false });
});

app.get('/products/create', isAdmin, (req, res) => {
    res.render('products/create');
});

app.post('/products', isAdmin, upload.single('image'), (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        category: req.body.category,
        image: req.file ? `/images/${req.file.filename}` : '/images/default.jpg'
    };
    products.push(newProduct);
    res.redirect('/products');
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.send('Producto no encontrado');
    res.render('products/detail', { product });
});

app.get('/products/:id/edit', isAdmin, (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.send('Producto no encontrado');
    res.render('products/edit', { product });
});

app.put('/products/:id', isAdmin, upload.single('image'), (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = {
            ...products[index],
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            category: req.body.category,
            image: req.file ? `/images/${req.file.filename}` : products[index].image
        };
        res.redirect(`/products/${req.params.id}`);
    } else {
        res.send('Producto no encontrado');
    }
});

app.delete('/products/:id', isAdmin, (req, res) => {
    const productId = req.params.id;
    const index = products.findIndex(p => p.id == productId);

    if (index !== -1) {
        products.splice(index, 1);
        res.redirect('/products');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Rutas del Carrito
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render('cart', { cart, total });
});

app.post('/cart/add/:id', (req, res) => {
    const productId = req.params.id;
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
