const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../../data/users.json');

const getUsers = () => {
    try {
        const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const controller = {
    register: (req, res) => {
        res.render('users/register');
    },

    processRegister: (req, res) => {
        const users = getUsers();
        // Verificar si el email ya existe
        const emailInUse = users.find(u => u.email === req.body.email);
        if (emailInUse) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            // Encriptar contraseña
            password: bcrypt.hashSync(req.body.password, 10),
            category: 'customer', // Categoría por defecto
            image: req.file ? `/images/users/${req.file.filename}` : '/images/users/default-user.jpg'
        };

        users.push(newUser);
        saveUsers(users);

        // ¿Login automático después del registro? ¿O redirigir al login? Redirijamos al login por ahora.
        res.redirect('/users/login');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {
        const users = getUsers();
        const userToLogin = users.find(u => u.email === req.body.email);

        if (userToLogin) {
            const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkPassword) {
                delete userToLogin.password; // No guardar la contraseña en la sesión
                req.session.user = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 * 24 }); // 24 Horas
                } else {
                    res.clearCookie('userEmail'); // Borrar cookie si no está seleccionada
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
