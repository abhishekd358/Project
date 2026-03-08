import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    expireAt:{type:Date, required:true},
    
}, {timestamps:true})



//ttl
sessionSchema.index({expiresAt:1},{expireAfterSeconds:0}) 


const sessionDB = mongoose.models.Session || mongoose.model('Session', sessionSchema)

export default sessionDB; 