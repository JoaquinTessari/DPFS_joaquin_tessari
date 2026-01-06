const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');

const getUsers = () => {
    try {
        const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
};

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    // Verificar cookie SOLO si la sesión no existe
    if (!req.session.user && req.cookies.userEmail) {
        const users = getUsers();
        const userFromCookie = users.find(u => u.email === req.cookies.userEmail);

        if (userFromCookie) {
            delete userFromCookie.password;
            req.session.user = userFromCookie;
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
