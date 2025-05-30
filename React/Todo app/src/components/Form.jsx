import React, { useState } from "react";
import "./Form.css";
import Card from "./Card";
const Form = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [formData, setFormData] = useState([
    {
      id: 1,
      title: "Dummy Task",
      desc: "This is Dummy Task With Action you can DELETE and EDIT the existing Task as well.",
    },
  ]);


  // we store the status of clicking of the edit button at which index
  const [isEditClick, setisEditClick] = useState(false);
  const [indexVal, setIndexVal] = useState(null);

  // submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title === "" || desc === "") {
      return;
    }
    if (isEditClick) {
      // update the title and desc of the index postion
      formData[indexVal].title = title;
      formData[indexVal].desc = desc;
      // setting back the state 
      setisEditClick(false);
      setTitle("");
      setDesc("");
      return;
    }
    const newData = { id: Math.random(), title, desc };
    setFormData([...formData, newData]);
    setTitle("");
    setDesc("");
  };

  // delHandler
  const delHandler = (id) => {
    
    setFormData(formData.filter((data) => data.id != id));
  };

  // edithandler : to show value in input field of the index were edit button was clicked
  const editHandler = (index) => {
    // first we take index, on which number of index user click
    // console.log(index);
    // now we set the value of title and desc to input field
    setTitle(formData[index].title);
    setDesc(formData[index].desc);
    setIndexVal(index);
  };

  return (
    <>
      <div className="nav-bar">Todo WebApp</div>
      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="inputbox"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="title">Description</label>
          {/* <input
            type="text"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          /> */}
          <textarea name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}></textarea>

          {isEditClick ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Add</button>
          )}
        </form>
      </div>

      <Card
        todo={formData}
        del={delHandler}
        edit={editHandler}
        setisEdit={setisEditClick}
      />
    </>
  );
};

export default Form;
