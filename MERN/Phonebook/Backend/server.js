import express from "express";
import mongoose from "mongoose";
import UserRouter from './Routes/user.route.js'
import ContactRouter from './Routes/contact.route.js'
import dotenv from 'dotenv';
dotenv.config()

// ------------------------------------- DB Connection
mongoose.connect(
    process.env.DB_URL,
    { dbName: "Phonebook" }
  )
  .then(() => console.log("Database Running"))
  .catch((error) => console.log(error));
// ------------------------------------- 

const app = express();

// ------------------------------------- middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  ------------------------------------ User-routes
app.use('/api/user', UserRouter)

//  ------------------------------------ Contact-routes
app.use('/api/user/contact', ContactRouter)


const port = process.env.PORT;
app.listen(port, () => console.log("Server Running on Port", port));
