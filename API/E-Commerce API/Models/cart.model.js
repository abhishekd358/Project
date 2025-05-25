import mongoose from "mongoose";

// if we creating cart imagine every user have its own cart and In that he can add Item 
// so in Mall every individual have Cart and they can add whatever item they likes with item price and quantity

//  so for that we have to make  Cart collection for ----> each new User
// user stores Items in the Cart  so  Item collection(where we store Item Quantity, price, title, productId) -----> store into -------> Cart collection of user in array form 


// cartSChema

const cartSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",//collection name
        required: true
    },
    items: [{productId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products", //collection name
        required: true}, quantity: {type:Number, default: 1, required:true}}],   // cart have space to store the Items or Product so we store in it
    totalItems: {type:Number , default: 1,  required:true},
    totalPrice: {type:Number , required:true}
})


export const CartDB  = mongoose.model("Cart", cartSchema)
