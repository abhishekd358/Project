import {createCart, deleteCart, getCart, removeByProductId, removeItemFromCart} from "../Controllers/cart.controller.js"
import express from "express"
import {userAuthentication} from "../Middelwares/user.auth.js"


const router = express.Router()


// adding element to Cart
// method: post
// endpoint : /api/user/cart/add
router.post('/add',userAuthentication, createCart)


// retrive user specific cart
// method: get
// endpoint : /api/user/cart/
router.get('/',userAuthentication, getCart)


// delete the whole cart
// method: delete
// endpoint : /api/user/cart/delete
router.delete('/delete',userAuthentication, deleteCart)

// descrease the quantity from the cart
// method: put
// endpoint : /api/user/cart/qty
router.put('/qty',userAuthentication, removeItemFromCart)

// deleting specific product from the cart
// method: delete
// endpoint : /api/user/cart/productId
router.delete('/:productId',userAuthentication, removeByProductId)





export default router;