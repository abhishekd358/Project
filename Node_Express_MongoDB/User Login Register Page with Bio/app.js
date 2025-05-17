import express from 'express';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';
// const upload = multer({ dest: 'uploads/' })



const app = express();


// widdleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }));
app.set('view engine', 'ejs');


// ------------------- cloudinary configuration -------------

cloudinary.config({ 
  cloud_name: 'dwtj9wtoh', 
  api_key: '691767474411747', 
  api_secret: '2QIhZKrydsQE08d9fN8XraIjpB4'
});


// ------------------- Multer DiskStorage --------------------
const storage = multer.diskStorage({
  destination: '/images',
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
    const datai = req.body
  res.json({datai})
})


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