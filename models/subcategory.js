'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(models) {
      Subcategory.belongsTo(models.Category, { foreignKey: 'category_id', as: "category" });
      Subcategory.hasMany(models.Product, { foreignKey: 'subcategory_id', as: "products" });
    }
  }
  Subcategory.init({
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
    name: {
      allowNull: false,
      type: DataTypes.STRING
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
    modelName: 'Subcategory',
    tableName: 'subcategories',
    timestamps: true,
    paranoid: true
  });
  return Subcategory;
};