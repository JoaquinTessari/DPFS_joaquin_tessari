module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        category_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        underscored: true
    };
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Brand, {
            as: 'brand',
            foreignKey: 'brand_id'
        });
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });
        Product.belongsToMany(models.Color, {
            as: 'colors',
            through: 'product_colors',
            foreignKey: 'product_id',
            otherKey: 'color_id',
            timestamps: false
        });
    }

    return Product;
};
