import React, { useEffect, useState } from "react";
import AddContact from "./AddContact";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const Phonebook = ({ token }) => {
  // for add new contact card open or not
  const [addContact, setAddContact] = useState(false);
  // my all contacts
  const [allContacts, setallContacts] = useState([]);
  // is edit button click
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  // taking id from edit btn for editHandler
  const [id, setId] = useState(null);
  const [reload, setReload] = useState(false);
  // fetching the contacts
  useEffect(() => {
    const fetchContactFromApi = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/contact",
          { headers: { Auth: `${token}` } }
        );
        setallContacts(response.data.contacts);
      } catch (error) {
        console.error(
          "Registration error:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchContactFromApi();
  }, [reload]);

  // del contact
  const delHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/contact/${id}`,
        {
          headers: { Auth: `${token}` },
        }
      );
      setReload(!reload);

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
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="auth-main">
        <main className="phone-container">
          {allContacts.map((data) => {
            return (
              <div className="card" key={data._id}>
                <div className="card-content">
                  <div className="person-name">{data.name}</div>
                  <div className="person-email">{data.email}</div>
                  <div className="person-phone">{data.phone}</div>
                </div>
                <div className="card-buttons">
                  <button
                    className="action-btn add-btn"
                    onClick={() => delHandler(data._id)}
                  >
                    <span className="material-symbols-outlined">
                      person_remove
                    </span>
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      setIsEditBtnClicked(true);
                      setAddContact(true);
                      setId(data._id);
                    }}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
              </div>
            );
          })}

          <button
            className="fab-button"
            title="Add New Contact"
            onClick={() => {
              setAddContact(true);
              setIsEditBtnClicked(false);
            }}
          >
            +
          </button>
        </main>
        {addContact == true && (
          <AddContact
            setAddContact={setAddContact}
            token={token}
            isEditBtnClicked={isEditBtnClicked}
            id={id}
            reload={reload}
            setReload={setReload}
          />
        )}
      </div>
    </>
  );
};

export default Phonebook;
