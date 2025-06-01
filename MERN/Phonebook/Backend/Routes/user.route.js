import express from 'express';
import { userLogin, userRegister } from '../Controllers/user.controller.js';


const router = express.Router()

// ----------------------------------------User routes
// route desc: user Register
// method: post
// endpoint: /api/user/register
router.post("/register", userRegister)

// route desc: user Login
// method: post
// endpoint: /api/user/login
router.post("/login", userLogin)



export default router;