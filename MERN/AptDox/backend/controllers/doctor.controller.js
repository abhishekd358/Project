// import Doctor from "../models/doctor.model"

import Doctor from "../models/doctor.model.js"



// Available or not functinality we require in admin and Doctor as well

const changeAvailability = async (req, res) => {
    try {
        // taking docId that we wnat to change its available propery
        const {docId} = req.body
        // console.log(docId)
        
        // finding in db particaular docID
        
        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{available: !docData.available})
        
        return res.json({message:`${docData.name} Availability Changed`,success:true})
        
    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})
    }
}



export {changeAvailability}

// // create account for Doctors
// export const doctorLogin = async (req, res) => {
//     // first check the docotor email and name, password recive or not
//     const {name, email, password} = req.body()
//     //  if not recived
//     if (!name || !email || !password){
//         return res.json({message:"All field requires!", success:false})
//     }

//     // now check is email id exisit in db
//     const isUserAlreadyExists = await Doctor.findOne({email})

//     if(!isUserAlreadyExists){
//         return res.json({message: "User already exists!", success:false})
//     }

//     // if doctor not present we create new entry to db
//     await Doctor.create({
//         name, email, password
//     })
    
//     return  res.json({message:`Welcome ${name} ! to AptDox ♥ Family.`})


// }