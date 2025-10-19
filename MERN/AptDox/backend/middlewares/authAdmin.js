import jwt from 'jsonwebtoken';

export const authAdmin= async(req, res,next) => {

    try {
        const adminToken = req.header('adminToken')

        // if not token getting 
        if(!adminToken){
            return res.json({message:"Please Login First!", success:false})
        }

        // if we receive token then we verify
        const validToken = jwt.verify(adminToken,  process.env.A_SECRET_KEY)

        if(validToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({message:"Invalid Credentials", success:false})
        }

        next()

    }
     catch (error) {
        console.log(error)
        res.json({message:error.message, success:false})
        
    }
}