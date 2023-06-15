import express from 'express'

import products from "../controllers/allProducts.js"
import protect from "../middlewares/auth.js";

const router = express.Router();

router.route('/create').post(protect,products.creteProduct)
router.route('/:limit/:nextToken').get(products.getAllProducts)
router.route('/single/:id')
    .put(protect,products.updateProducts)
    .delete(protect,products.deleteProduct)
router.route('/batchDelete').put(protect,products.batchDeleteProduct)

export default router