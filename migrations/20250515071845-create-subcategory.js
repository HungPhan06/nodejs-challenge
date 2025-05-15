'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subcategories', {
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
      name: {
        allowNull: false,
        type: Sequelize.STRING
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
        { fields: ['category_id'] }
      ]
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subcategories');
  }
};