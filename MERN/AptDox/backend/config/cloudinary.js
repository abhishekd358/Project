import { v2 as cloudinary } from 'cloudinary'


const cloudinaryConnect = async () => {
  cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
//   secure_distribution: 'mydomain.com',
//   upload_prefix: 'https://api-eu.cloudinary.com'
    secure:true,
});
  
}


export default cloudinaryConnect;


// import
// config
// CloudinaryStorage 
// we dump storage into Multer
// 