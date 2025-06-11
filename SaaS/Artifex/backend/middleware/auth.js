import jwt from 'jsonwebtoken'
import { UserDB } from '../models/userModel.js'

const userAuth = async (req, res) => {
    const token = req.header('Auth')
    

    // check the token is getting from the header or not
    if(!token){
        return res.json({message:'Login failed...', success: false})
    }

    // now compare the token
    const correctToken = jwt.verify(token, process.env.SECRET_KEY)

    if(!correctToken){
        return res.json({message: 'Please enter correct token.', success:false})
    }

    //  now check the correctToken --> user ID find in UserDB or not
    const user = await UserDB.findById(correctToken)
    console.log(user)
}



export default userAuth;