module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderItem';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'order_items',
        timestamps: true,
        underscored: true
    };
    const OrderItem = sequelize.define(alias, cols, config);

    OrderItem.associate = function (models) {
        OrderItem.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'order_id'
        });
        OrderItem.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });
    }

    return OrderItem;
};
