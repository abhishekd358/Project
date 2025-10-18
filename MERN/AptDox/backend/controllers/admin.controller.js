


// API for adding doctor 
const addDoctor = async(req, res)=>{
    try{
        const {name, email, password,speciality,degree, experience, about, fees, address} = req.body;
        // to get file
        const imgFile = req.file;
        // testing above value getting or not
        console.log({name, email, password,speciality,degree, experience, about, fees, address},imgFile)
    }
    catch(error){
        res.json({message:error.message, success:false})
    }
}


export {addDoctor}