import { useState } from "react";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
  usePostUsersMutation,
  useUpdateUsersMutation,
} from "./store/apiSlice/apiSlice";

function App() {
  // ----------------- getting users from fetch from DB/API
  // console.log(useGetUsersQuery())
  const { data, error, isLoading, refetch } = useGetUsersQuery();
  // console.log("users", data?.users); //optional chaining

  // ----------------------------- add new user to db/APi
  // console.log(usePostUsersMutation())
  const [postUsers] = usePostUsersMutation();
  //  to caputre form field we use state here
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });
  // console.log(formData)
  // addNewuser functionality
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await postUsers(formData).unwrap();
      alert("User Added successfully");
      // when user form submit successfully we going to empty form fields
      setFormData({ firstName: "", lastName: "", age: "", email: "" });

      // Refetch the users list after adding a new user
      refetch();
    } catch (error) {
      console.error("Failed to save the post: ", error);
    }
  };

  // to capute user enter form field we have tocreate
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =============================================================================
  const [deleteUsers] = useDeleteUsersMutation();

  //  take user on which id is clicking in state
  const [editingUserId, setEditingUserId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteUsers(id).unwrap();
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Delete failed: ", err);
    }
  };

  // ======================================================
  const [updateUsers] = useUpdateUsersMutation();

  const handleUpdate = async () => {
    try {
      await updateUsers({ id: editingUserId, ...formData }).unwrap();
      alert("Post updated successfully!");
      setFormData({ firstName: "", lastName: "", age: "", email: "" }); // clear form
      setEditingUserId(null);
      refetch(); // list refresh
    } catch (err) {
      console.error("Update failed: ", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;
  return (
    <div className="app">
      <h1 className="title">Users List</h1>

      <div className="form-container">
        <h3>{editingUserId ? "Edit User" : "Add New User"}</h3>
        <form
          className="user-form"
          onSubmit={editingUserId ? handleUpdate : onSubmitHandler}
        >
          {/* first name */}
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
          />
          {/* last name */}
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
          />
          {/* age */}
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={onChangeHandler}
          />
          {/* email */}
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
          />
          {/* button */}
          <button type="submit" className="btn">
            {editingUserId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

        {/* showing all the list of users */}
      <div className="users-container">
        {data?.map((user) => (
          <div key={user.id} className="user-card">
            <p>
              <strong>Full Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <div className="card-actions">
              <button
                className="btn delete"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
              <button
                className="btn edit"
                onClick={() => {
                  setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email,
                  });
                  setEditingUserId(user.id);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
