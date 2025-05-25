import { userRegistration , userLogin } from "../Controllers/user.controller.js";
import express from 'express';


const router = express.Router()



// route for register 
// method : post
// endpoint : api/user/register
router.post('/register', userRegistration);


// route for user login
// method : post
// endpoint : api/user/login
router.post('/login', userLogin);








export default router;