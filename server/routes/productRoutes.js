import express from 'express'

import { admin, protect } from '../middleware/authMiddleware.js'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productController.js'
const router =express.Router()
router.post('/',protect,admin, createProduct)
router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.delete('/:id',protect,admin, deleteProduct)
router.put('/:id',protect,admin, updateProduct)

export default router