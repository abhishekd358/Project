import express from 'express'
import { addDoctor, adminLogin } from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js'  // multer config as middleware
import { authAdmin } from '../middlewares/authAdmin.js'




const adminRouter = express.Router()



// add-docotr route
// method- POST
//full path - localhost:3000/api/admin/add-doctor
adminRouter.post('/add-doctor', authAdmin,upload.single('image'), addDoctor)  // we sending image on backend with 'image' name

// add-docotr route
// method- POST
//full path - localhost:3000/api/admin/login
adminRouter.post('/login',adminLogin)


export default adminRouter

