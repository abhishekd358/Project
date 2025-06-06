import axios from "axios";
import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
const AddContact = ({
  setAddContact,
  token,
  isEditBtnClicked,
  id,
  setReload,
  reload,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/contact/add",
        { name, email, phone },
        { headers: { Auth: `${token}` } }
      );

      // toast
      toast(response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setEmail("");
      setName("");
      setPhone("");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const editHandler = async (e, id) => {
    e.preventDefault();
    console.log(e);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/contact/${id}`,
        { name, email, phone },
        { headers: { Auth: `${token}` } }
      );

      toast(response.data.message, {
position: "top-center",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});

      setReload(!reload);
      setEmail("");
      setName("");
      setPhone("");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-card">
          {isEditBtnClicked ? <h2>Edit Contact</h2> : <h2>Add New Contact</h2>}
          {/* form submit handles if iseditbtn click means true then editHandler run otherwise addHandler run */}

          {isEditBtnClicked ? (
            <form
              className="modal-form"
              method="PUT"
              onSubmit={(e) => editHandler(e, id)}
            >
              <label>
                Name
                <input
                  type="text"
                  placeholder="Enter full name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  <span className="material-symbols-outlined">person_add</span>
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setAddContact(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </form>
          ) : (
            <form className="modal-form" method="POST" onSubmit={addHandler}>
              <label>
                Name
                <input
                  type="text"
                  placeholder="Enter full name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  <span className="material-symbols-outlined">person_add</span>
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setAddContact(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddContact;
