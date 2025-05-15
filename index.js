require('dotenv').config();
require('express-group-routes');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.group('/api', (router) => {
  router.group('/v1', (v1) => {
    v1.use('/auth', require('./routes/auth'));
    v1.use('/products', require('./routes/product'));
    v1.use('/categories', require('./routes/category'));
    v1.use('/subcategories', require('./routes/subcategory'));
  });
});

const PORT = 8089;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});