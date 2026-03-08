import jwt from 'jsonwebtoken';
import sessionDB from '../models/session.model.js';

export const authUser= async(req, res,next) => {

    try {
        const token = req.header('token')
             

        // if not token getting 
        if(!token){
            return res.json({message:"Please Login First!", success:false})
        }

        // if we receive token then we verify
        const validSession = jwt.verify(token,  process.env.U_SECRET_KEY)

        
        // now check valid session refrence to which userId
        const session = await sessionDB.findById(validSession.sessionId)

        if(!session){
            return res.json({message: "Session expired. Please login again.", success: false})
        }

        // if valid session then we store the respective session userID
      

         req.userId = session.userId 
         req.sessionId = session._id
         

        next()

    }
     catch (error) {
        console.log(error)
        res.json({message:error.message, success:false})
        
    }
}