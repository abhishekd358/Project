import express from 'express';
import dotenv from 'dotenv'
dotenv.config({})

const app = express();

// middleware to parse JSON request bodies
app.use(express.json())


//test route
app.get('/',(req,res)=>{
    return res.json({message: "API is working", success: true})
})

const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});