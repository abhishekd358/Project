import express from 'express';
import { paymentRazorpay, userCredits, userLogin, userRegister } from '../controllers/userController.js';
import userAuth from '../middleware/auth.js';

const UserRouter = express.Router()


// register
// endpoint: api/user/register
// desc: new user registeration handling
UserRouter.post('/register', userRegister)


// login
// endpoint: api/user/login
// desc: new user login handling
UserRouter.post('/login',  userLogin);


// credit
// endpoint : api/user/credit
// desc: rturn the token available for user
UserRouter.get('/credits',userAuth, userCredits )

// payment
// endpoint : api/user/pay-razor
// desc: for payment handle
UserRouter.get('/pay-razor',userAuth, paymentRazorpay )


export default UserRouter;