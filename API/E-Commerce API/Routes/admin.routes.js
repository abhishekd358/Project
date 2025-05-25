import { adminRegistration , adminLogin } from "../Controllers/admin.controller.js";
import express from 'express';


const router = express.Router()



// route for register 
// method : post
// endpoint : api/admin/register
router.post('/register', adminRegistration);


// route for user login
// method : post
// endpoint : api/admin/login
router.post('/login', adminLogin);








export default router;