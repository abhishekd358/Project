import { populate } from "dotenv";
import { CartDB } from "../Models/cart.model.js";
import { ProductDB } from "../Models/Product.model.js";

// adding item in the cart
export const createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  //  the input parameter from user end should not be empty
  // Check for missing fields
  if (!productId || quantity == null) {
    return res
      .status(400)
      .json({ message: "All fields are mandatory", success: false });
  }

  //  check the product that user send through Body is exist or not in ProductD
  const validProduct = await ProductDB.findById(productId);
  if (!validProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  // getting userId from the token that pass user get when login. we create a gloabal variable in user.auth.js
  const Id = req.userId;

  // check is there exist already a cart of particular userId
  let userCart = await CartDB.findOne({ userId: Id });

  if (!userCart) {
    // so we create a cart for the user
    userCart = new CartDB({
      userId: Id,
      items: [{ productId, quantity }],
      totalItems: quantity,
      totalPrice: validProduct.finalPrice * quantity,
    });
  } else {
    // already cart present for user

    // there are two condition if already cart exist 1. Cart have already Items , 2. else Cart have 0 items
    // condition 1: cart exists productId then we only increase its Quantity
    //  this below code return if -1 if productId enterd user is find in the user CartDB , otherwise it return index of the productId
    const productExistInCartIndex = userCart.items.findIndex(
      (p) => p.productId.toString() === productId
    );

    // if productId index found in cartDB of specific user
    if (productExistInCartIndex > -1) {
      userCart.items[productExistInCartIndex].quantity += quantity;
    } else {
      // otherwise we push the productId, quantity
      userCart.items.push({ productId, quantity });
    }

    userCart.totalItems += quantity;
    userCart.totalPrice += validProduct.finalPrice * quantity;
  }

  await userCart.save();

  // Populate product details
  const populatedCart = await CartDB.findById(userCart._id).populate(
    "items.productId",
    "title finalPrice"
  );

  res.json({
    message: "Product added to cart successfully",
    cart: populatedCart,
    success: true,
  });
};

// get cart by userId

export const getCart = async (req, res) => {
  const userId = req.userId;

  // if req.userId not receive from the userAuth Middleware
  if (!userId) {
    return res.json({ message: "Login First!", success: false });
  }

  const cartData = await CartDB.findOne({ userId });

  if (cartData.items == 0) {
    return res.json({ message: "Cart is empty", success: false });
  }

  const populateData = await CartDB.findOne({ userId }).populate(
    "items.productId",
    "title brand finalPrice "
  );

  res.json({
    message: "Your Cart Items as follows:",
    cartData: populateData,
    success: true,
  });
};

// delete whole cart
export const deleteCart = async (req, res) => {
  const userId = req.userId;

  // if req.userId not receive from the userAuth Middleware
  if (!userId) {
    return res.json({ message: "Login First!", success: false });
  }

  const cartData = await CartDB.findOne({ userId });

  if (!cartData) {
    return res.json({ message: "Cart is already empty", success: false });
  }

  // Clear items and reset totals
  cartData.items = [];
  cartData.totalItems = 0;
  cartData.totalPrice = 0;

  cartData.save();

  res.json({ message: "Cart deleted Successfully", success: true });
};

// decrease the quantity of product
export const removeItemFromCart = async (req, res) => {
  const userId = req.userId;

  // if req.userId not receive from the userAuth Middleware
  if (!userId) {
    return res.json({ message: "Login First!", success: false });
  }
  // taking user input
  const { productId, quantity } = req.body;

  //the productId and quantity should not be empty
  if (productId == "" || quantity <= 0) {
    return res.json({
      message: "Enter valid productId or quantity",
      success: false,
    });
  }
  // now go to db and find the user specific cart
  const userCart = await CartDB.findOne({ userId });
  // if user cart not found
  if (!userCart) {
    return res.json({ message: "Cart Not Found", success: false });
  }
  // if userCart is there but there is no product in it
  if (userCart.items.length === 0) {
    return res.json({ message: "0 item in Cart", success: false });
  }
  // if items are present in cart then we have to find the productId exist or not that user pass first if exist then remove it
  const productIndex = userCart.items.findIndex(
    (p) => p.productId.toString() == productId
  );
  // if product id not found
  if (productIndex <= -1) {
    return res.json({ message: "Product not found in cart", success: false });
  }

  const cartItem = userCart.items[productIndex];

  //  Fetch the latest product price from ProductDB
  const product = await ProductDB.findById(productId);
  if (!product) {
    return res.json({
      message: "Product not found in database",
      success: false,
    });
  }
  const productPrice = product.finalPrice; // or whatever field you store the price in

  if (quantity >= cartItem.quantity) {
    // Remove the item entirely
    userCart.totalItems -= cartItem.quantity;
    userCart.totalPrice -= cartItem.quantity * productPrice;
    userCart.items.splice(productIndex, 1);
  } else {
    // Reduce quantity
    cartItem.quantity -= quantity;
    userCart.totalItems -= quantity;
    userCart.totalPrice -= quantity * productPrice;
  }

  await userCart.save();

  const populatedCart = await CartDB.findById(userCart._id).populate(
    "items.productId",
    "title price"
  );

  res.json({
    message: "Cart updated successfully",
    cart: populatedCart,
    success: true,
  });
};

// remove product from the cart by product id

export const removeByProductId = async (req, res) => {
  const userId = req.userId;

  //  productId
  const productId = req.params.productId;

  // if req.userId not receive from the userAuth Middleware
  if (!userId) {
    return res.json({ message: "Login First!", success: false });
  }

  // now go to db and find the user specific cart
  const userCart = await CartDB.findOne({ userId });
  // if user cart not found
  if (!userCart) {
    return res.json({ message: "Cart Not Found", success: false });
  }
  // if userCart is there but there is no product in it
  if (userCart.items.length === 0) {
    return res.json({ message: "0 item in Cart", success: false });
  }
  // if items are present in cart then we have to find the productId exist or not that user pass first if exist then remove it
  const productIndex = userCart.items.findIndex(
    (p) => p.productId.toString() == productId
  );
  // if product id not found
  if (productIndex <= -1) {
    return res.json({ message: "Product not found in cart", success: false });
  }


  // Fetch the latest product price from ProductDB
  const product = await ProductDB.findById(productId);
  if (!product) {
    return res.json({
      message: "Product not found in database",
      success: false,
    });
  }
  const productPrice = product.finalPrice; // or whatever field you store the price in


  const removedItem = userCart.items[productIndex];



    const removedQuantity = removedItem.quantity;
    const removedPrice = removedQuantity * productPrice;

    // Remove the item from the cart
    userCart.items.splice(productIndex, 1);

    // Update the totals
    userCart.totalItems -= removedQuantity;
    userCart.totalPrice -= removedPrice;

    // Ensure totals are not negative
    if (userCart.totalItems < 0){ userCart.totalItems = 0;}
    if (userCart.totalPrice < 0){userCart.totalPrice = 0;}

    // Save the updated cart
    await userCart.save();

  // Populate updated cart
  const populatedCart = await CartDB.findById(userCart._id).populate(
    'items.productId',
    'title finalPrice'
  );

  res.json({
    message: "Cart updated successfully",
    cart: populatedCart,
    success: true,
  });

};
