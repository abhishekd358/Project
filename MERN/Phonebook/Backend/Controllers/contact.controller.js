import { Contact } from "../Models/contact.js";


// add contact
export const addContact = async (req, res) => {
  try {

    if(req.body == undefined){
        return res.json({ message: "body required!!!.", success: false });
    }
    
    const { name, email, phone } = req.body;
 

    if (name == "" || phone == "") {
      return res.json({ message: "name and phone mandantory", success: false });
    }
    const contactsdata = await Contact.create({
      name,
      email,
      phone,
      userId: req.userId,
    });
    res.json({ message: "Contact saved!!!", contact_details:contactsdata, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// del contact
export const delContact = async (req, res) => {
  try {

    const id = req.params.id
    if(!id){
        return res.json({ message: "Contact Id Not Found", success: false });
    }


    // ==========================security check valid user can delete valid respective id
    const LoginUser = req.userId
    
    const contact = await Contact.findById(id);
    
    // if my loginUser Id and the resoective COntact saved userId if same then only process to update otherwise return 
    if(!contact){
        // Sucpicious activity not allowed
        return res.json({message:'Contact Not Found', success:false})
    }

    // ------------------------------ extra layer of security check that , other user with another user contactId can not able to perform any activity
    // check that is valid user having valid id with reapective to the user only can perform respective contact operation

      // Check if this contact belongs to the logged-in user
      if(contact.userId.toString()!== LoginUser){
      return res.status(403).json({ message: "Unauthorized access", success: false });
    }

    // -------------------------end security code

    await Contact.findByIdAndDelete(id);
    res.json({ message: "Contact Deleted!!!", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// get all contact
export const getAllContact = async (req, res) => {
  try {
    const userId = req.userId
    const contactsdata = await Contact.find({userId});
    res.json({ message: "All your Contacts!!!", contacts: contactsdata, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// update contact
export const updateContact = async (req, res) => {
  try {
    if(req.body == undefined){
        return res.json({ message: "body required!!!.", success: false });
    }
    
    const { name, email, phone } = req.body;
 

    if (name == "" || phone == "") {
      return res.json({ message: "name and phone mandantory", success: false });
    }

    const id = req.params.id
    const LoginUser = req.userId
 
    
    const contact = await Contact.findById(id);

    
    // if my loginUser Id and the resoective COntact saved userId if same then only process to update otherwise return 
    if(!contact){
        // Sucpicious activity not allowed
        return res.json({message:'Contact Not Found', success:false})
    }

    // ------------------------------ extra layer of security check that , other user with another user contactId can not able to perform any activity
    // check that is valid user having valid id with reapective to the user only can perform respective contact operation

      // Check if this contact belongs to the logged-in user
      if(contact.userId.toString()!== LoginUser){
      return res.status(403).json({ message: "Unauthorized access", success: false });
    }

    // -------------------------end security code

    const contactsdata = await Contact.findByIdAndUpdate(id, {name, email, phone}, {new:true});
    if(!contactsdata){
        res.json({ message: "Enter Valid Id", contact_details:contactsdata, success: false });
    }

    res.json({ message: "Contact Updated Successfully!!!", contact_details:contactsdata, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};