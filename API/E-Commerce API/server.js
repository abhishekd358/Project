import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import userRouter from './Routes/user.routes.js'
import productRouter from './Routes/product.routes.js'
import adminRouter from './Routes/admin.routes.js'
import cartRouter from './Routes/cart.routes.js'

// mongoose connection 
mongoose.connect(process.env.DB_URI, {dbName: "ecommerce"}).then(()=>console.log("Database connected successfully.")).catch((error)=>console.log(error))


const app = express();



// middleware
app.use(express.json());




// routes


// User
app.use('/api/user', userRouter)

// admin
app.use('/api/admin', adminRouter)


// Product
app.use('/api/products', productRouter)

// cart
app.use('/api/user/cart', cartRouter)



const port = process.env.PORT
app.listen(port, ()=>console.log("Server Running on Port",port))