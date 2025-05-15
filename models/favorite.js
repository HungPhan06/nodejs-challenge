'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: "user",
        onDelete: 'CASCADE',
      });
      Favorite.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: "product",
        onDelete: 'CASCADE',
      });
    }
  }
  Favorite.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      validate: {
        notNull: true
      },
    },
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      validate: {
        notNull: true
      },
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
    modelName: 'Favorite',
    tableName: 'favorites',
    timestamps: true,
    paranoid: true
  });
  return Favorite;
};