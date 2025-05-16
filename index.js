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

// Routes
require('./routes')(app); 

const PORT = 8089;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});