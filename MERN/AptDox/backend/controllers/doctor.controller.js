import Doctor from "../models/doctor.model"

// create account for Doctors
export const doctorLogin = async (req, res) => {
    // first check the docotor email and name, password recive or not
    const {name, email, password} = req.body()
    //  if not recived
    if (!name || !email || !password){
        return res.json({message:"All field requires!", success:false})
    }

    // now check is email id exisit in db
    const isUserAlreadyExists = await Doctor.findOne({email})

    if(!isUserAlreadyExists){
        return res.json({message: "User already exists!", success:false})
    }

    // if doctor not present we create new entry to db
    await Doctor.create({
        name, email, password
    })
    
    return res.json({message:`Welcome ${name} ! to AptDox ♥ Family.`})


}