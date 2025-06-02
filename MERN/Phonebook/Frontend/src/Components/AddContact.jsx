import React from 'react'

const AddContact = ({setAddContact}) => {
  return (
    <>
    <div className="modal-overlay">
  <div className="modal-card">
    <h2>Add New Contact</h2>
    <form className="modal-form">
      <label>
        Name
        <input type="text" placeholder="Enter full name" required/>
      </label>
      <label>
        Email
        <input type="email" placeholder="Enter email address" required/>
      </label>
      <label>
        Phone
        <input type="tel" placeholder="Enter phone number" required/>
      </label>
      <div className="modal-actions">
        <button type="submit" className="btn-save"><span class="material-symbols-outlined">person_add</span></button>
        <button type="button" className="btn-cancel" onClick={()=>setAddContact(false)}><span class="material-symbols-outlined">
close
</span></button>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default AddContact