const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.get);
router.delete('/:id', ProductController.delete);
router.post('/', ProductController.post);

module.exports = router