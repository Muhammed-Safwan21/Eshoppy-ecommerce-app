import express from "express";
import { createProduct, createProductReview, deleteProduct, getProducts,getProductsById, getTopProducts, updateProduct } from "../controllers/productController.js";
import {protect, admin} from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js';
const router = express.Router()

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/top').get(getTopProducts)
router.route('/:id').get(checkObjectId,getProductsById).put(protect,admin,checkObjectId,updateProduct).delete(protect,admin,checkObjectId,deleteProduct);
router.route('/:id/reviews').post(checkObjectId,protect,createProductReview)

export default router;