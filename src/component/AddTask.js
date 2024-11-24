import React, { useContext, useState } from "react";
import { TaskContext } from "../TaskContext";
import { taskStatus, priority } from "../helper/Helper";

export const AddTask = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addTask, tasks } = useContext(TaskContext);
  const [description, setDescription] = useState("");
  
  const checkTaskAlreadyExists = (value)=>{
    if(tasks.length > 0){
      return tasks.some((item)=> item.taskTitle === value );
    } else {
      return false;
    }
 
  }

  const Handler = () => {
    console.log("tasks", tasks)
    const dataExist = checkTaskAlreadyExists(value);
    if (value) {
        if(dataExist)
        {
          setErrorMessage("Task is already exists!")
        } else {
            const taskData = {
            taskTitle: value.trim(),
            description: description.trim(),
            isDelete: false,
            taskStatus: taskStatus.INPROGRESS,
            priority: priority.LOW,
          };
          addTask(taskData);
          setValue(""); 
          setDescription("");
        }
      
    } else {
      setErrorMessage("Please enter task title!")
    }
  };


  const styles = {
    inputWrapper:{
      display: "flex",
      width:"100%",
      gap:"15px",
      margin:"15px 0px",
      flexDirection:"column"
    },
    inputStyle:{
      flexGrow:"1",
      padding: "10px 15px",
      borderRadius: "15px",
      border: "1px solid gray",
      resize: "vertical",
      minHeight: "20px",
      maxHeight: "130px",
    },
    buttonStyle:{
      width:"150px",
      padding: "10px 20px",
      borderRadius: "15px",
      backgroundColor: "#448AFF",
      color: "white",
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
    },
    alertMessage:{
      color: "#E91E63",
      margin: "0px",
    },
    taskManagerTitle:{
      fontWeight: "900",
      fontSize: "30px",
      textAlign: "center"
    },
    buttonWrapper:{
      display: "flex",
      justifyContent: "space-between",

    },
    taskTitle:{
      margin: "0px",
      lineHeight: "10px"
    }
  }

  return (
    <div>
       <p style={styles.taskManagerTitle}>Task Manager</p>
      <div style={styles.inputWrapper}>
        <label style={styles.taskTitle}>Task Title <span style={{color:"#e91e63"}}>*</span></label>
         <input
          style={styles.inputStyle}
          value={value}
          onFocus={()=> setErrorMessage("")}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          maxLength="150"
          placeholder="Enter task title"
        />
         <label style={styles.taskTitle}>Task Description</label>
        <textarea value={description} maxLength="250" onChange={(e)=>{
          setDescription(e.target.value);
        }} placeholder="Description" style={styles.inputStyle}></textarea>
        <div style={styles.buttonWrapper}>
          <p style={styles.alertMessage}>{errorMessage}</p>
          <button
            style={styles.buttonStyle}
            onClick={() => {
              Handler();
            }}
          >
            Add
          </button>
        </div>
        
      </div>
     
    </div>
  );
};
