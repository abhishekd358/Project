import jwt from "jsonwebtoken"
import { UserDB } from "../Models/User.model.js"

export const userAuthentication = async (req, res, next) => {
    const token = req.header("Auth")
    // console.log(token)
    try{

        // if user not enter the token 
    if(!token){
        return res.json({message:"Login First!", success: false})
    }
    
    // if token enter decode the token to get userId
    const decode =  jwt.verify(token, process.env.JWT_SECRET)

    // if decode is not complete
    if(!decode){
        return res.json({message:"Enter correct token", success: false})
    } 

     const id = decode.userId

    // else
    // check is the user Exists in userDB or not
    const userExists = await UserDB.findById(id)
    if(!userExists){
        return res.json({message:"User Not Found!", success: false})
    }
    
    // create a global variable 
    req.userId = id 

    next()
    }catch(error){
        res.json({message:error.message})
    }


}