import { ProductDB } from "../Models/Product.model.js";



// all  access to all 
export const allProducts  = async (req, res) => {
        const products = await ProductDB.find();
        if (!products) {
            return res.json({messgae:"No Product Found", success:false})
        }

        res.json({messgae:"The list of Products", allProducts:products, success:true})
}


// access product by id
export const getProductById = async(req, res)=>{
    // taking id from the parameter
        const id = req.params.id

    const productData = await ProductDB.find({id})
    console.log(productData)

    // if id not found
    if(!productData){
        return res.status(404).json({messgae: "Enter Valid Product ID.", success:false})
    }

    // now return admin a msg that 
    res.status(200).json({messgae: "Hurrey!!! Here is the product details.", productDetails:productData ,success:true})

}



// ===================================== ADMIN BASED OPERATION =======================================

// creat product only admin
export const createProduct = async(req, res)=>{
    const {title, description , brand, category, price , discount, finalPrice, images, ratings} = req.body
    // field should not empty
    if(title =="" || description =="" || brand =="" || category=="" || price =="" || discount=="" || finalPrice=="" ){
        return res.status(400).json({messgae: "except images and ratings all fields mandatory.", success:false})
    }

    // // check title existing product in DB as title should not be same
    // const productExists = await ProductDB.findOne({title})

    // // if title find 
    // if(productExists ){
    //     return res.status(406).json({messgae: "Product exists already or change title", success:false})
    // }

    // if not find
    const newProduct = await ProductDB.create({title, description , brand, category, price , discount, finalPrice, images, ratings, admin:req.adminId})

    // now return admin a msg that 
    res.status(201).json({messgae: "New Product Added Successfully", newProduct ,success:true})

}



// update product by id only admin
export const updateProduct = async(req, res)=>{
    // taking id from the parameter
        const id = req.params.id


    const {title, description , brand, category, price , discount, finalPrice, images, ratings} = req.body
    // field should not empty
    if(title =="" || description =="" || brand =="" || category=="" || price =="" || discount=="" || finalPrice=="" ){
        return res.status(400).json({messgae: "except images and ratings all fields mandatory.", success:false})
    }

    const updateProduct = await ProductDB.findByIdAndUpdate(id,{
        title, description , brand, category, price , discount, finalPrice, images, ratings
    },{new:true})

    // if id not found
    if(!updateProduct){
        return res.status(404).json({messgae: "Enter Valid Product ID. Updation Failed!.", success:false})
    }


    // now return admin a msg that 
    res.status(200).json({messgae: "Product Details Updated Successfully", updatedDetails:updateProduct ,success:true})

}




// Delete product by id only admin
export const deleteProduct = async(req, res)=>{
    // taking id from the parameter
        const id = req.params.id


    // find the id and delte from db
     const productIdExists = await ProductDB.findByIdAndDelete(id)

     if(!productIdExists){
        return res.status(404).json({messgae: "Enter Valid Product ID. Deletion Failed!", success:false})
    }


    // now return admin a msg that 
    res.status(200).json({messgae: "Product Deleted !!!",success:true})

}

