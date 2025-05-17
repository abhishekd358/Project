import express from 'express';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';
multer({ dest: 'uploads/' })
import mongoose from 'mongoose';
import { profileDB } from './models/userProfileData.js';
import path from 'path';

// mongoose connection
mongoose.connect('mongodb+srv://abhidhaware1234:0cNSfkcG3SA9fBQj@cluster0.wuxv9he.mongodb.net/', {dbName:'UserProfileData'}).then(()=>{console.log('Database connected')}).catch((error)=>console.log(error))





const app = express();


// widdleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(path.resolve(), 'public')))


// ------------------- cloudinary configuration -------------

cloudinary.config({ 
  cloud_name: 'dwtj9wtoh', 
  api_key: '691767474411747', 
  api_secret: ''
});


// ------------------- Multer DiskStorage --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



// ----------------- routes ----------------
// home
app.get('/', (req, res)=>{
  res.render('Home.ejs')
})
// signup
app.get('/SignUp', (req, res)=>{
    res.render('SignUp.ejs')
})

app.post('/profile', upload.single('avatar'), async (req, res)=> {
    // uploading images to cloudinary
    const filePath = req.file.path
    const dataImage = await cloudinary.uploader
.upload(filePath, {folder : 'UserAuth',})


// storing image and input user data in mongo
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


    const userData = await profileDB.create({name:name, email:email, password:password, img_url: dataImage.secure_url, public_id:dataImage.public_id})

    // after saving we render ejs
    // img url 
    const profileImage= dataImage.secure_url
    const username = userData.name
    const useremail = userData.email
    res.render('Profile.ejs',{profileImage, username, useremail})
});


// signin
app.get('/SignIn', (req, res)=>{
    res.render('SignIn.ejs')
})

app.post('/dashboard', (req, res)=>{
    const data = req.body
    res.render('Dashboard.ejs', {data})
})



const port = 1200;
app.listen(port, ()=>console.log("Server Running On",port))