import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";

// ------------------- env config
dotenv.config({ path: './config/.env', quiet: true }); // so we hide the Logging of .env file loading

// ------------------------ CORS --------------------------
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     // allowed origins
//     const allowedOrigin = [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:3000",
  
//     ];

//     if (allowedOrigin.includes(origin)) {
//       return callback(null, true);
//     } else {
//       callback(new Error("CORS policy violation"));
//     }
//   },
//   credential: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// };



const app = express();

// middleware to parse JSON request bodies
app.use(express.json());
// using cors here
app.use(cors());
// DB conncection
await connectDB();
// cloudinary connect
cloudinaryConnect()

//test route
app.get("/", (req, res) => {
  res.json({ message: "API is working", success: true });
});

// Admin endpoint
//api/admin/

app.use('/api/admin/',adminRouter)


// frontend route for fetch doctor list
app.use('/api/doctor/',doctorRouter)




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🌏 Server is running on port ${port}`);
});
