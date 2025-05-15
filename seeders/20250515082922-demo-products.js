'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const subcategories = await queryInterface.sequelize.query(
      `SELECT id, name FROM subcategories;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const electronics = categories.find(c => c.name === 'Electronics');
    const phones = subcategories.find(sc => sc.name === 'Phones');
    const laptops = subcategories.find(sc => sc.name === 'Laptops');

    await queryInterface.bulkInsert('products', [
      {
        name: 'iPhone 13',
        price: 999.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MacBook Pro',
        price: 1999.99,
        category_id: electronics.id,
        subcategory_id: laptops.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
