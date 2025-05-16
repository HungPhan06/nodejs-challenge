const express = require("express")
const router = express.Router();
const productController = require('../../controllers/product');

router.post('/', productController.createProduct);
router.post('/:id/like', productController.likeProduct);

module.exports = router;
