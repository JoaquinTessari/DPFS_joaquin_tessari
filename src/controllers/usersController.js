const db = require('../database/models');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const controller = {
    register: (req, res) => {
        res.render('users/register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // Verificar si el email ya existe
        db.User.findOne({
            where: { email: req.body.email }
        })
            .then(userInDB => {
                if (userInDB) {
                    return res.render('users/register', {
                        errors: {
                            email: {
                                msg: 'Este email ya está registrado'
                            }
                        },
                        oldData: req.body
                    });
                }

                return db.User.create({
                    firstName: req.body.firstName, // Uses VIRTUAL setter or we should use mapped field
                    // Actually my VIRTUAL setup allows setting firstName which sets first_name.
                    // Note: User.create takes the alias keys if defined in model attributes? 
                    // Wait, if I defined 'first_name' column and 'firstName' virtual, Model.create({ firstName: '...' }) works?
                    // Yes, if I check Sequelize docs.
                    // But simpler might be to just pass first_name: req.body.firstName if I removed the virtual or just rely on VIRTUAL logic.
                    // Let's use the DB column names in create to be safe if VIRTUAL setters have issues, but VIRTUAL setters should work.
                    // However, the cleanest is to use the property names defined.
                    // My replacement above DEFINED 'firstName' as a VIRTUAL field with setter.
                    // But wait, the previous tool call replaced the definition.
                    // Let's assume VIRTUAL works. Or I can just pass 'first_name': req.body.firstName.
                    // I'll try to stick to what works. I will use 'first_name' key in create object to be 100% sure.
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    user_category_id: 2, // 'customer' by default. We could fetch ID from 'customer' name but ID 2 is safe per data.sql.
                    image: req.file ? `/images/users/${req.file.filename}` : '/images/users/default-user.jpg'
                });
            })
            .then(() => {
                res.redirect('/users/login');
            })
            .catch(error => res.send(error));
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        db.User.findOne({
            where: { email: req.body.email },
            include: ['category'] // Include category info if needed ("admin" check in views uses user.category usually as string?)
            // Views check: user.category === 'admin'.
            // In DB user.category is an Association. user.category.name would be 'admin'.
            // JSON used user.category = 'admin'.
            // I need to map this or update views. 
            // Views use <%= user.category %>.
            // If user.category is an object, <%= user.category %> prints [object Object].
            // I should flatten this structure for the session or update the view.
            // User model assoc: User.belongsTo(UserCategory, as: 'category').
            // So user.category will be the UserCategory model instance.
            // I should probably store in session a manipulated object where user.category is the NAME string.
        })
            .then(userToLogin => {
                if (userToLogin) {
                    const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if (isOkPassword) {
                        // userToLogin is Sequelize Instance.
                        let userSession = userToLogin.get({ plain: true }); // Convert to plain object
                        delete userSession.password;

                        // Fix category for compatibility with views
                        if (userSession.category && userSession.category.name) {
                            userSession.category = userSession.category.name;
                        }

                        req.session.user = userSession;

                        if (req.body.remember_user) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 24 }); // 24 Horas
                        } else {
                            res.clearCookie('userEmail');
                        }

                        return req.session.save(() => {
                            res.redirect('/users/profile');
                        });
                    }
                    return res.render('users/login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son inválidas'
                            }
                        }
                    });
                }

                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'No se encuentra este email en nuestra base de datos'
                        }
                    }
                });
            })
            .catch(error => res.send(error));
    },

    profile: (req, res) => {
        res.render('users/profile', {
            user: req.session.user
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controller;
