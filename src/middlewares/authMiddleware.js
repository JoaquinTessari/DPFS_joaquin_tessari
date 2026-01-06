const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // Check if user JSON data has a category field instead of role, based on users.json
    if (req.session.user && req.session.user.category === 'admin') {
        return next();
    }
    res.redirect('/users/login');
};

module.exports = isAdmin;
