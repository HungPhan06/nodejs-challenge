const express = require("express")
const router = express.Router();
const productController = require('../controllers/product');
const auth = require('../middleware/auth');

router.get('/search', productController.searchProducts);
router.get('/', productController.getAllProducts);
router.post('/', auth, productController.createProduct);
router.post('/:id/like', auth, productController.likeProduct);

module.exports = router;
