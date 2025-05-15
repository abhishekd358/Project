import express from "express";
import { v2 as cloudinary } from 'cloudinary';
// importing the multer
import multer from "multer";
import mongoose from "mongoose";
// import DBSchema
import { ImageDB } from "./models/ImageDB.js";

// connection with mongoDB
mongoose.connect('mongodb+srv://abhidhaware1234:0cNSfkcG3SA9fBQj@cluster0.wuxv9he.mongodb.net/',{dbName: 'ImageDB'}).then(()=>console.log("Database Connect Successfully...!!!")).catch((error)=>console.log(error))





const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



// Configuration
cloudinary.config({ 
    cloud_name: 'dwtj9wtoh', 
    api_key: '691767474411747', 
    api_secret: '<pass here your key>' // Click 'View API Keys' above to copy your API secret
});



// multer disk Storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })




// routes 
app.get('/', (req, res)=>{
    res.render('index.ejs', { displayImg: null })
})

// route from the multer
app.post('/uploads', upload.single('file'), async (req, res) => {
        const filePath = req.file.path
      // uploading data to cloudinary
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
        filePath, { folder :'Images_Store', })

    //  uploading data to mongoDB
    const image = await ImageDB.create({
      public_id: uploadResult.public_id,
      img_url: uploadResult.secure_url,
      Image_name: uploadResult.original_filename,
    })

    // displaying img on the home route
    res.render('index.ejs', {displayImg:image.img_url, altName:image.Image_name})

})


const port = 1200;
app.listen(port, ()=>console.log('Server Running On Port',port))

