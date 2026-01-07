module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    };
    let config = {
        tableName: 'orders',
        timestamps: true,
        underscored: true
    };
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        Order.hasMany(models.OrderItem, {
            as: 'items',
            foreignKey: 'order_id'
        });
    }

    return Order;
};
