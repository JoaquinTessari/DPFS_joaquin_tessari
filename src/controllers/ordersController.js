const db = require('../database/models');

const ordersController = {
    checkout: async (req, res) => {
        if (!req.session.cart || req.session.cart.length === 0) {
            return res.redirect('/cart');
        }

        if (!req.session.user) {
            return res.redirect('/users/login');
        }

        const cart = req.session.cart;
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        try {
            console.log('DEBUG: Starting checkout process');
            console.log('DEBUG: User ID:', req.session.user.id);
            console.log('DEBUG: Cart length:', cart.length);
            console.log('DEBUG: Total calculated:', total);

            // Create Order
            const order = await db.Order.create({
                user_id: req.session.user.id,
                total: total
            });
            console.log('DEBUG: Order created with ID:', order.id);

            // Create Order Items
            const itemPromises = cart.map(item => {
                console.log('DEBUG: Creating item for product:', item.id);
                return db.OrderItem.create({
                    order_id: order.id,
                    product_id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                });
            });

            await Promise.all(itemPromises);
            console.log('DEBUG: All items created successfully');

            // Clear Cart
            req.session.cart = [];

            // Return success with order details
            res.render('orders/success', { order, items: cart });

        } catch (error) {
            console.error('CRITICAL CHECKOUT ERROR:', error);
            res.send(`Error al procesar la compra: ${error.message}`);
        }
    }
};

module.exports = ordersController;
