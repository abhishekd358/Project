import express from 'express';
import { userLogin, userRegister } from '../controllers/userController.js';
import userAuth from '../middleware/auth.js';

const UserRouter = express.Router()


// register
// endpoint: api/user/register
// desc: new user registeration handling
UserRouter.post('/register', userRegister)


// login
// endpoint: api/user/login
// desc: new user login handling
UserRouter.post('/login', userAuth, userLogin);




export default UserRouter;