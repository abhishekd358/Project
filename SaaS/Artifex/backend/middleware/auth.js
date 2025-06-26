import jwt from 'jsonwebtoken'
import { UserDB } from '../models/userModel.js'

const userAuth = async (req, res, next) => {
    
    const token = req.header('token')
    try {
            // check the token is getting from the header or not
    if(!token){
        return res.json({message:'Not Authorized Login failed...', success: false})
    }

    // now compare the token
    const correctToken = jwt.verify(token, process.env.SECRET_KEY)

    if(!correctToken){
        return res.json({message: 'Please enter correct token.', success:false})
    }

    //  now check the correctToken --> user ID find in UserDB or not
    const user = await UserDB.findById(correctToken.userId)
    if(!user){
        return res.json({messgae: 'User not found.', success:false})
    }

    req.userId = user._id

    next()

    } catch (error) {
        return res.json({message:error.message, success:false})       
    }

}



export default userAuth;