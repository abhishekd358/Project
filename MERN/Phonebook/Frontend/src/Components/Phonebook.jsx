import React,{useEffect, useState} from "react";
import AddContact from "./AddContact";
import axios from "axios";

const Phonebook = ({message}) => {

 // for add new contact card open or not
  const [addContact, setAddContact] = useState(false)

  // fetching the contacts
  useEffect(() => {
    const fetchContactFromApi = async () => {
      try {
        const api = await axios.get('http://localhost:3000/api/user/contact')
        console.log(api)
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        
      }
    }
    fetchContactFromApi() 
  }, [])
   


  return (
    <>
      <div className="auth-main">
        {message != null && <h2>{message}</h2> }
        <main className="phone-container">

          <div className="card">
            <div className="card-content">
              <div className="person-name">John Doe</div>
              <div className="person-email">john@example.com</div>
              <div className="person-phone">+123456789</div>
            </div>
            <div className="card-buttons">
              <button className="action-btn add-btn">Add</button>
              <button className="action-btn edit-btn">Edit</button>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="person-name">John Doe</div>
              <div className="person-email">john@example.com</div>
              <div className="person-phone">+123456789</div>
            </div>
            <div className="card-buttons">
              <button className="action-btn add-btn">Add</button>
              <button className="action-btn edit-btn">Edit</button>
            </div>
          </div>
          
          

          <button className="fab-button" title="Add New Contact" onClick={()=>setAddContact(true)}>+</button>
        </main>
          {addContact == true && <AddContact setAddContact = {setAddContact}/>}
      </div>
    </>
  );
};

export default Phonebook;
