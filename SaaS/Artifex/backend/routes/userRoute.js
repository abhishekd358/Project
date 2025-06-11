import express from 'express';
import { userLogin, userRegister } from '../controllers/userController.js';

const UserRouter = express.Router()


// register
// endpoint: api/user/register
// desc: new user registeration handling
UserRouter.post('/register', userRegister)


// login
// endpoint: api/user/login
// desc: new user login handling
UserRouter.post('/login', userLogin);




export default UserRouter;