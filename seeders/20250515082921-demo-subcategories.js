'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const electronics = categories.find(c => c.name === 'Electronics');
    const books = categories.find(c => c.name === 'Books');

    let dataVms = [];
    if (electronics) {
      dataVms.push({
        name: 'Phones',
        category_id: electronics.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      dataVms.push({
        name: 'Laptops',
        category_id: electronics.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    if (books) {
      dataVms.push({
        name: 'Novels',
        category_id: books.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('subcategories', dataVms);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
