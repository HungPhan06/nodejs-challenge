'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      category_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'categories',
          key: 'id',
        }
      },
      subcategory_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'subcategories',
          key: 'id',
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      indexes: [
        { fields: ['name'] },
        { fields: ['category_id'] },
        { fields: ['subcategory_id'] }
      ]
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};