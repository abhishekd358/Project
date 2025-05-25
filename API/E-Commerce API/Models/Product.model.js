import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number, // In percent
    default: 0
  },
  finalPrice: {
    type: Number // Automatically calculated = price - discount
  },
  images: [
    {
      url: String,
      public_id: String
    }
  ],
  ratings: {
    type: Number,
    default: 0
  },
    // foreign key of admin id
    admin : {type:mongoose.Schema.Types.ObjectId}
},{timestamps:true})


export const ProductDB = mongoose.model("Products", productSchema)