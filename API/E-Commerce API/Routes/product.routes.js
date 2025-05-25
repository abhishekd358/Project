import express from "express";
import { allProducts, getProductById , createProduct , updateProduct, deleteProduct } from "../Controllers/product.controller.js";
// import middelware
import {adminAuthentication} from '../Middelwares/admin.auth.js'


const router = express.Router();


// get all products
// method: get
// endpoint : /api/products/
router.get('/', allProducts)

// delete product by id only admin verify
// method: delete
// endpoint : /api/products/admin/:id
router.get('/:id', getProductById)


// ++++++++++ ADMIN BASED ROUTES +++++++++++


// create new product by admin verify
// method: post
// endpoint : /api/products/admin/new
router.post('/admin/new',adminAuthentication, createProduct)


// update product by id only admin verify
// method: put
// endpoint : /api/products/admin/:id
router.put('/admin/:id',adminAuthentication, updateProduct)


// delete product by id only admin verify
// method: delete
// endpoint : /api/products/admin/:id
router.delete('/admin/:id',adminAuthentication, deleteProduct)








export default router;