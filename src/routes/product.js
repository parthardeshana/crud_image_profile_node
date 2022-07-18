const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.get);
router.get('/:id', ProductController.getOne);
router.delete('/:id', ProductController.delete);
router.post('/', ProductController.post);
router.put('/:id', ProductController.update);

module.exports = router