import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../TaskContext";

export const CustomSelectInput = (props) => {
    const { tasks, updateTask } = useContext(TaskContext);

    const [options, setOptions] = useState({});
    
    const {index, propertyType, hideDropdown} = props;
    

    const handleSelect = (value) => {
      const updatedTaskData = tasks.map((item,i)=>{
        if(index === i){
          item[propertyType] = value;
        }
        return item;
      })
     updateTask(updatedTaskData);
      hideDropdown("");
    };

  useEffect(()=>{
        setOptions(props.options)
    },[props])

  return (
    <div>
      <ul className="customSelectList">
        {Object.entries(options).map(([key, value]) => (
          <li 
            key={key} 
            onClick={() => handleSelect(value)} 
            style={{ cursor: "pointer", margin: "5px 0" }}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
