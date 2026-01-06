const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.category === 'admin') {
        return next();
    }
    res.redirect('/');
};

module.exports = isAdmin;
