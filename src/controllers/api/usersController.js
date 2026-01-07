const db = require('../../database/models');

const usersAPIController = {
    list: (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        db.User.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(({ count, rows }) => {
                let next = null;
                let previous = null;

                if (count > page * limit) {
                    next = `/api/users/?page=${page + 1}`;
                }
                if (page > 1) {
                    previous = `/api/users/?page=${page - 1}`;
                }

                let respuesta = {
                    meta: {
                        status: 200,
                        total: count,
                        url: 'api/users',
                        next: next,
                        previous: previous
                    },
                    data: rows.map(user => {
                        return {
                            id: user.id,
                            name: user.first_name + ' ' + user.last_name,
                            email: user.email,
                            detail: `/api/users/${user.id}`
                        }
                    })
                }
                res.json(respuesta);
            })
            .catch(error => res.json(error));
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                if (user) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: `/api/users/${user.id}`
                        },
                        data: {
                            id: user.id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            image: `/images/users/${user.image}` // Assuming images are served from /images/users/
                        }
                    }
                    res.json(respuesta);
                } else {
                    res.status(404).json({ meta: { status: 404 }, data: "User not found" });
                }
            })
            .catch(error => res.json(error));
    }
}

module.exports = usersAPIController;
