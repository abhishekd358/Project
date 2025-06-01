import express from "express";
import mongoose from "mongoose";
// import bodyParser from 'express';

// DB Connection
mongoose
  .connect("user connection string ", { dbName: Phonebook })
  .then(() =>
    console.log("Database Running").catch((error) => console.log(error))
  );

const app = express();

// middleware
app.use(express.json())
// app.use(bodyParser())

//  routes 

// api/user/
app.post("/api/user", (req, res) => {
    // taking the body and destructure 
    // const {name, email, password}= req.body
    console.log(req.body)

});

const port = 3000;
app.listen(port, () => console.log("Server Running on Port", port));
