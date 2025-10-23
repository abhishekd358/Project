import jwt from 'jsonwebtoken';

export const authUser= async(req, res,next) => {

    try {
        const token = req.header('token')
             

        // if not token getting 
        if(!token){
            return res.json({message:"Please Login First!", success:false})
        }

        // if we receive token then we verify
        const validToken = jwt.verify(token,  process.env.U_SECRET_KEY)


      

         req.userId = validToken.id
         

        next()

    }
     catch (error) {
        console.log(error)
        res.json({message:error.message, success:false})
        
    }
}