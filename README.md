# Introduction
Node.js Challenge: Product Management System

# ----------------------------------------------- #

# Setup & Installation
# Prerequisites
 - Node.js >= 18.x

 - npm or yarn (npm recommended)

 - MySQL or compatible database

 - Sequelize CLI (to run migrations)

# ----------------------------------------------- #

# Installation
1. Install dependencies:
npm install
or
yarn install

2. Configure environment variables:
Create a .env file with the necessary variables, for example:
- DB_HOST=localhost
- DB_PORT=3306
- DB_USER=root
- DB_PASS=yourpassword
- DB_NAME=yourdatabse
- JWT_SECRET=your_jwt_secret

3. Run migration to create tables:
npx sequelize-cli db:migrate

Run seeder to generate demo data:
npx sequelize-cli db:seed:all

4. Start the server:
npm start

# ----------------------------------------------- #

# API Documentation
Detailed API documentation is available here:  
🔗 https://www.postman.com/orange-station-824268/node-js-challenge/overview

# 1. Authentication
# 1.1 POST /auth/login
 - Log in, return JWT token.
 - Body (json): 
    {
        "username": string (required),
        "password": string (required)
    }

    Example:
    {
        "username": "johndoe",
        "password": "password123"
    }

# 1.2 POST /auth/logout
 - Log out, disable token.

# 2. Products
# 2.1 GET /products
 - Get a list of products with pagination.
 - Query parameters:
    - page (optional, default 1)
    - limit (optional, default 10)

# 2.2 GET /products/search?q=keyword
- Search for products by name.
- Query parameters:
    - q (required)
    - page (optional, default 1)
    - limit (optional, default 10)

# 2.3 POST /products
 - Create a new product (Requires JWT token).
 - Body (json): 
    {
        "name": string (required),
        "price": numeric (required),
        "category_id": integer (required),
        "subcategory_id": integer (required),
    }

    Example:
    {
        "name": "Product Name",
        "price": 123.45,
        "category_id": 1,
        "subcategory_id": 2
    }

# 2.4 POST /products/:id/like
 - Like or unlike a product (toggle) (Requires JWT token).

# 3. Category
# 3.1 GET /categories
- Get a list of all categories

# 4. Category
# 4.1 GET /subcategories
- Get all subcategories list or filter by category
- Query parameters:
    - category_id (optional, default null)

# ----------------------------------------------- #

# Features & Implementation Details
# 1. Authentication
Use JWT for authentication.
The token has a default validity of 120 minutes.
The token is stored in the access_tokens table to manage login and logout.

# 2. Caching & Optimization
Use NodeCache to cache query results for popular lists such as products, categories, subcategories.
Caching is paginated by key, for example products:page:1:limit:10 to optimize queries.
When there is a data change (create product, like/unlike), the related cache will be cleared to ensure the data is always fresh.
The query to count the number of product likes is performed via SQL subquery, avoiding complex joins.

# 3. Like Feature
The favorites table stores information about users who like products.
The API /products/:id/like performs like status toggle.
The relationship between Favorite, User and Product is clearly defined in Sequelize with foreign keys.
Liking and unlike deletes or adds records to the favorites table respectively.