const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    // Verificar cookie SOLO si la sesión no existe
    if (!req.session.user && req.cookies.userEmail) {
        try {
            const userFromCookie = await db.User.findOne({
                where: { email: req.cookies.userEmail },
                include: ['category']
            });

            if (userFromCookie) {
                let userSession = userFromCookie.get({ plain: true });
                delete userSession.password;

                // Fix category for compatibility
                if (userSession.category && userSession.category.name) {
                    userSession.category = userSession.category.name;
                }

                req.session.user = userSession;
            }
        } catch (error) {
            console.error('Error in userLoggedMiddleware:', error);
        }
    }

    if (req.session.user) {
        res.locals.isLogged = true;
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }

    next();
}

module.exports = userLoggedMiddleware;
