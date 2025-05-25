import jwt from 'jsonwebtoken';
import { AdminDB } from '../Models/admin.model.js';

export const adminAuthentication = async (req, res, next) => {
    try{
        const token = req.header('Auth');

    // decode this token that admin inputed in the header
    const decode = jwt.verify(token , process.env.JWT_SECRET)
    if(!decode){
        return res.status(401).json({message: "invalid token!!!.", success:false})
    }

    // if not decoded correectly

    // checking what is inside the decode
    // console.log(decode);

    // mow check the 'admin' variable value in 'decode' data that is same as value present od Id in adminDB
   
    const tokenVerified = await AdminDB.findOne(decode.ObjectId)
    // console.log(tokenVerified)
    // if not token verify correctly
    if(!tokenVerified){
        return res.status(401).json({message: "Authentication Failed! Login First.", success:false})
    } 

    // store the admin id so we can store in productDB , it represent which admin create which product
    req.adminId = decode.admin

    
    next()
    }catch (err) {
    // Handle all errors here (like invalid token, expired token, etc.)
    return res.status(401).json({ message: "Invalid token!", error: err.message, success: false });
  }
    
}