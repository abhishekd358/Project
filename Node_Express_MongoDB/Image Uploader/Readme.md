# 📷 Image Uploader with Express, Cloudinary,Multer and MongoDB

This project is a full-stack image uploading web application built with **Node.js**, **Express**, **Multer**, **Cloudinary**, and **MongoDB**. Users can upload images from their local machine, which are then stored on Cloudinary, and metadata is saved in MongoDB. Uploaded images are also displayed on the frontend using EJS templates.

---

### 📸 Screenshot
<!-- Add your own image file -->
<img src="image-uploader.jpg" alt="image-uploader-image">

## 🔧 Features

- Upload images via a simple HTML form
- Store images securely on [Cloudinary](https://cloudinary.com/)
- Save image metadata (URL, public ID, name) in MongoDB Atlas
- View the uploaded image immediately after uploading
- Uses **Multer** for handling file uploads
- **EJS** as the templating engine for rendering HTML

---

## 🛠️ Tech Stack

- Backend: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- File Uploads: [Multer](https://github.com/expressjs/multer)
- Image Hosting: [Cloudinary](https://cloudinary.com/)
- Templating: [EJS](https://ejs.co/)

---

## 📁 Project Structure
```
image-uploader/
├── models/
│ └── ImageDB.js # MongoDB Mongoose schema
├── views/
│ └── index.ejs # Frontend view using EJS
├── .env # Environment variables (not included in repo)
├── server.js # Main Express app
├── package.json
└── README.md
```


### 📜 License
This project is licensed under the MIT License.

### 🙌 Acknowledgements
- Cloudinary
- Multer
- MongoDB Atlas

### ✍️ Author
GitHub: @abhishekd358