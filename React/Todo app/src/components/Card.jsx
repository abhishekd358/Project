import React from "react";
const Card = ({ todo, del, edit, setisEdit}) => {
  return (
    <>
      <div className="card-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Task No.</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((data, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.title}</td>
                    <td>{data.desc}</td>
                    <td>
                      <button
                        onClick={() => {
                          edit(index);
                          {
                            setisEdit(true);
                          }
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => del(data.id)}>Delete</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Card;
