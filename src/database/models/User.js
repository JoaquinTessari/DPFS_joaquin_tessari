module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            field: 'first_name'
        },
        firstName: {
            type: dataTypes.VIRTUAL,
            get() {
                return this.getDataValue('first_name');
            },
            set(value) {
                this.setDataValue('first_name', value);
            }
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            field: 'last_name'
        },
        lastName: {
            type: dataTypes.VIRTUAL,
            get() {
                return this.getDataValue('last_name');
            },
            set(value) {
                this.setDataValue('last_name', value);
            }
        },
        email: {
            type: dataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        },
        user_category_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            field: 'user_category_id'
        },
        userCategoryId: {
            type: dataTypes.VIRTUAL,
            get() {
                return this.getDataValue('user_category_id');
            },
            set(value) {
                this.setDataValue('user_category_id', value);
            }
        }
    };
    let config = {
        tableName: 'users',
        timestamps: true,
        underscored: true
    };
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.UserCategory, {
            as: 'category',
            foreignKey: 'user_category_id'
        });
    }

    return User;
};
