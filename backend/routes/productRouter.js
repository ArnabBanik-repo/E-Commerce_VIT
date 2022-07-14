const express = require('express')
const router = express.Router()
const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')

router.route('/').get(getProducts).post(addProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router
