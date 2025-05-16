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
      {
        name: 'Samsung Galaxy S22',
        price: 899.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dell XPS 13',
        price: 1499.99,
        category_id: electronics.id,
        subcategory_id: laptops.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPhone 13',
        price: 399.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple Watch Series 8',
        price: 499.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPad Air',
        price: 599.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Google Pixel 7',
        price: 799.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon',
        price: 1599.99,
        category_id: electronics.id,
        subcategory_id: laptops.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Tab S8',
        price: 749.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPhone 15',
        price: 919.99,
        category_id: electronics.id,
        subcategory_id: phones.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
