import express from 'express'
import mongoose from 'mongoose'
import UserRouter from './routes/userRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'
import imageRouter from './routes/imageRoute.js'
// dotenv config
dotenv.config()


// creating connection with DB
mongoose.connect(process.env.DB_URL, {dbName: 'Artifex'}).then(()=>console.log('Database connected successfully.')).catch((error)=>console.log(error))


const app = express()

// middlewares
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // allow only your frontend
  credentials: true,               // if using cookies or auth headers
}));




// ---------user route
app.use('/api/user', UserRouter)
app.use('/api/image', imageRouter)

const port = process.env.PORT;
app.listen(port, ()=>console.log('Server Running Successfully on port', port))