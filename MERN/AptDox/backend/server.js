import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";

// ------------------- env config
dotenv.config({ path: './config/.env', quiet: true }); // so we hide the Logging of .env file loading

// ------------------------ CORS --------------------------
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    // allowed origins
    const allowedOrigin = [
      "http://localhost:5173",
      "https://myblog.com",
      "https://admin.myblog.com",
    ];

    if (allowedOrigin.includes(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());
// using cors here
app.use(cors(corsOptions));
// DB conncection
await connectDB();

//test route
app.get("/", (req, res) => {
  res.json({ message: "API is working", success: true });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🌏 Server is running on port ${port}`);
});
