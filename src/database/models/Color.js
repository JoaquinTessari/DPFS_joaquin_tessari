module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'colors',
        timestamps: false
    };
    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {
        Color.belongsToMany(models.Product, {
            as: 'products',
            through: 'product_colors',
            foreignKey: 'color_id',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return Color;
};
