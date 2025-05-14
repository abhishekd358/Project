// import mongoose
import mongoose, { mongo } from 'mongoose';



const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true },
}, { timestamps: true });

export const UrlDb = mongoose.model('Url', urlSchema);
