import jwt from 'jsonwebtoken';


const doctorAuth = async (req, res, next) => {
    try {
        const doctorToken = req.header('doctorToken')

        // if not token getting 
        if(!doctorToken){
            return res.json({message:"Please Login First!", success:false})
        }

        // if we receive token then we verify
        const validToken = jwt.verify(doctorToken,  process.env.D_SECRET_KEY)

        if(!validToken){
            return res.json({message:"Invalid Credentials", success:false})
        }

        req.docId = validToken.id

        next()

    }
     catch (error) {
        console.log(error)
        res.json({message:error.message, success:false})
        
    }
}



export default doctorAuth;