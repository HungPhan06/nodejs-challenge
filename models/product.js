'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Product.belongsTo(models.Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });
      Product.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'product_id',
        as: 'likedBy',
      });
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    category_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      validate: {
        notNull: true
      },
    },
    subcategory_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      validate: {
        notNull: true
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true
  });
  return Product;
};