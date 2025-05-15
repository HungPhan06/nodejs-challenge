'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
    static associate(models) {
      AccessToken.belongsTo(models.User, { foreignKey: 'user_id', as: "user" });
    }
  }
  AccessToken.init({
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
      }
    },
    token: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    expired_at: {
      type: DataTypes.DATE
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
    modelName: 'AccessToken',
    tableName: 'access_tokens',
    timestamps: true,
    paranoid: true
  });
  return AccessToken;
};