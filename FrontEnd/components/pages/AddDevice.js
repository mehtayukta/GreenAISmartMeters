import { useState } from "react";
import "../../styles/device.css";
import TodoDevices from "./TodoDevices";
import EnterItem from "./InputItem";
import React from 'react';
import Table from 'react-bootstrap/Table';


export default function App() {
  const [item, setItem] = useState("");
  const [itemArr, setItemArr] = useState([]);

  const itemValue = (event) => {
    setItem(event.target.value.trim());
  };

  const ChangeValue = () => {
    if (item !== "") {
      setItemArr([...itemArr, item]);
      setItem("");
    }
  };

  const deletitem = (id) => {
    console.log("delete");
    setItemArr((preValu) => {
      return preValu.filter((arrEle, index) => {
        return index !== id;
      });
    });
  };

  const updateItem = (id, editValue) => {
    // console.log(id);
    // console.log(editValue);
    if (editValue !== "") {
      setItemArr((preValu) => {
        preValu[id] = editValue;
        return [...preValu];
      });
    }
  };

  return (
    <>
      <div id="main">
        <div className="center_div">
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>IoT Station name</th>
            <th>Action</th>
            
          </tr>
        </thead>
      </Table>
          <EnterItem
            id="task"
            type="text"
            placeholder="Add a Device"
            value={item}
            onChange={itemValue}
          />
          <button id="btn" onClick={ChangeValue}>
            +
          </button>
          <ol>
            {itemArr.map((itemCur, index) => {
              return (
                <TodoDevices
                  className="list"
                  classNameDelete="delete"
                  classNameEdit="edit"
                  key={index}
                  id={index}
                  text={itemCur}
                  onSelect={deletitem}
                  onEdit={updateItem}
                />
              );
            })}
          </ol>
          <br/>
        </div>
      </div>
      ;
    </>
  );
}
