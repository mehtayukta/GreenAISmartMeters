import { useState } from "react";
import React from 'react';
import '../../styles/device.css'

const TodoDevices = (props) => {
  const [editInput, setEditInput] = useState("");
  const [addInEdit, setAddInEdit] = useState({
    show: false
  });

  const EditItem = () => {
    console.log("edit");
    setAddInEdit({ show: true });
  };
  const funEditUpdate = (event) => {
    setEditInput(event.target.value.trim());
  };
  return (
    <>
      <div className="todo_style">
      <div className="table-wrapper">
     
    </div>

        <li className={props.className}>{props.text}</li>
        <button className="GreenButton">View</button>
        {addInEdit.show ? (
          <>
            <br />
            <input type="text" placeholder="Edit" onChange={funEditUpdate} />
            
            <button
              onClick={() => {
                props.onEdit(props.id, editInput);
                setAddInEdit({ show: false });
              }}
            >
              +
            </button>
          </>
        ) : (
          <button className={props.classNameEdit} onClick={EditItem}>
            edit
          </button>
        )}
        <button
          className={props.classNameDelete}
          onClick={() => {
            props.onSelect(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TodoDevices;
