import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../TaskContext";

import { priority, taskStatus } from "../helper/Helper";
import { CustomSelectInput } from "./CustomSelect";
import Arrow from "../assets/icons/arrow.png";

export const TaskList = () => {
  const { tasks,updateTask } = useContext(TaskContext);
  const [showPrioritySelect,setShowPrioritySelect] = useState("");
  const [showTaskStatusSelect,setShowTaskStatusSelect] = useState("");
  const [isDelete, setIsDelete] = useState("");
  const [tasksStateData, setTaskStateData] = useState([]);
  const [inputText,setInputText] = useState("");
  const [showTaskDetails,setshowTaskDetails] = useState("");

  const deleteHandler = (index)=>{
    if(index === ""){
      updateTask("")
    } else {
    const updatedTaskData = tasks.filter((item, i)=> i !== index);
    console.log("updatedTaskData",updatedTaskData);
    updateTask(updatedTaskData);
    }
    setIsDelete("");
    
  }

  //search for tasks
  const onChangeHandler = (e)=>{
    console.log(tasksStateData)
    setInputText(e.target.value);
    if(e.target.value.trim()){
       // Normalize the search string (case-insensitive)
      const searchString = e.target.value.toLowerCase();

      // Filter the tasks
      const filteredTasks = tasksStateData.filter(task =>
        task.taskTitle.toLowerCase().includes(searchString)
      );
      setTaskStateData(filteredTasks);
    } else {
      setTaskStateData(tasks);
    }
  }

  

  // Mapping Priority Values to Numeric Order
const priorityOrder = {
  [priority.LOW]: 1,
  [priority.MEDIUM]: 2,
  [priority.HIGH]: 3,
};

// Updated Sorting Logic
const toggleSort = (array, property, order) => {
  return [...array].sort((a, b) => {
    const valueA =
      property === "priority" ? priorityOrder[a[property]] : a[property];
    const valueB =
      property === "priority" ? priorityOrder[b[property]] : b[property];

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  });
};

    const [currentSort, setCurrentSort] = useState({ type: null, order: "asc" });

  const handleSort = (property) => {
    const newOrder = currentSort.type === property && currentSort.order === "asc" ? "desc" : "asc";
    const sortedTasks = toggleSort(tasks, property, newOrder);
    setTaskStateData(sortedTasks);
    setCurrentSort({ type: property, order: newOrder });
  };


  useEffect(()=>{
    setTaskStateData(tasks);
  },[tasks]);

  const styles = {
    listContainer:{
      padding: "15px",
      borderRadius: "15px",
      backgroundColor: "#ebebeb"
    },
    table:{
      width: "100%",
      border: "1px solid lightGray",
      borderCollapse: "collapse"
    },
    
    td: {
      padding: "0px 5px"
    },
    th: {
      padding: "15px 5px",
      textAlign: "left",
      minWidth: "55px"
    },
    tr:{
      borderBottom: "1px solid lightGray",
      backgroundColor: "white"
    },
    customOptionWrapper:{
      position: "relative",
    },
    optionListWrapper:{
      backgroundColor: "red",
      zIndex: 1,
      position: "absolute",
      width: "100%",
      borderRadius: "15px",
      top: "30px"
    },
    tableDeleteButton:{
      padding: "5px 15px",
      backgroundColor: "#e91e63",
      color: "white",
      borderRadius: "15px",
      border: "none",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
      width: "max-content"
    },
    deleteButton:{
      padding: "10px 15px",
      backgroundColor: "#e91e63",
      color: "white",
      borderRadius: "15px",
      border: "none",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
      minWidth: "100px"  
    },
    cancelButton:{
      padding: "10px 15px",
      backgroundColor: "lightgray",
      color: "white",
      borderRadius: "15px",
      border: "none",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
      minWidth: "100px" 
    },
    buttonWrapper:{
      display: "flex",
      flexDirection: "row",
      gap: "15px",
      justifyContent: "center",
    },
    deleteTitle:{
      fontSize: "22px",
      marginBottom: "40px"
    },
    titleText:{
      padding: "6px",
      margin: "0px",
      fontWeight: "bold",
      color: "#448AFF",
      cursor: "pointer"
    },
    inputStyle:{
      padding: "10px 15px",
      borderRadius: "15px",
      border: "1px solid gray",
      width: "100%",
      marginBottom: "15px",
      boxSizing: "border-box"

    },
   tableWrapper:{
      overflowX: "auto",
      minHeight: "30vh",
      maxHeight: "50vh",
   },
   clearMemoryButtonWrapper:{
      display: "flex",
      justifyContent: "right",
      marginTop: "15px"
   },
   clearAllData:{
    padding: "5px 15px",
    backgroundColor: "#448AFF",
    color: "white",
    borderRadius: "15px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    width: "max-content"
   }
  };
  return (
    <div style={styles.listContainer}>
        <h2 style={{color:tasks.length > 0 ? "black": "gray", textAlign: tasks.length > 0 ? "left": "center"}}>
          {tasks.length > 0 ? "Task List":"Task list is empty!"} 
        </h2>
        {tasks.length > 0 && 
        <>
          <input placeholder="Search task..." style={styles.inputStyle} value={inputText} onChange={(e)=>onChangeHandler(e)}/>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
            <tr style={styles.tr}>
              <th style={styles.th}>
                  Sl. No.
              </th>
              <th style={styles.th} className="sortingWrapper" onClick={()=>{ handleSort("taskTitle")}}>
                  <div className="sortingWrapperInner">
                    <div>Task</div>
                    <img src={Arrow} style={{width: "20px"}}/>
                </div>
              </th>
              <th style={styles.th} className="sortingWrapper" onClick={()=>{ handleSort("priority")}}>
                <div className="sortingWrapperInner">
                    <div>Priority</div>
                    <img src={Arrow} style={{width: "20px"}}/>
                </div>
              </th>
              <th style={styles.th} className="sortingWrapper" onClick={()=>{ handleSort("taskStatus")}}>
                  <div className="sortingWrapperInner">
                    <div>Status</div>
                    <img src={Arrow} style={{width: "20px"}}/>
                </div>
              </th>
              <th style={styles.th}>
                  Action
              </th>
            </tr>
            </thead>
            <tbody>
            {tasksStateData && tasksStateData.map((task, index) => (
              <tr className="tableBodyTr" key={index}>
                <td style={styles.td}>
                  {index + 1}
                </td>
                <td style={styles.td}>
                  <p style={styles.titleText} onClick={()=>{
                    setshowTaskDetails({taskTitle: task.taskTitle, taskDescription: task.description})
                  }}>
                    {task.taskTitle}
                  </p>
                </td>
                <td style={styles.td}>
                    <div style={styles.customOptionWrapper}>
                      <div>
                        <p style={{
                        backgroundColor: task.priority === priority.LOW 
                          ? "#388E3C" 
                          : task.priority === priority.MEDIUM 
                            ? "#FFA000" 
                            : "#E91E63",
                        color: "white",
                        borderRadius:"15px",
                        display: "flex",
                        justifyContent: "center",
                        padding: "5px 15px",
                        cursor: "pointer",
                        width: "max-content",  
                        margin: "8px 0px"  
                        }} onClick={()=>{
                          setShowPrioritySelect(showPrioritySelect === index ? "": index)
                          setShowTaskStatusSelect("");
                        } }>
                          {task.priority} 
                        </p>
                      </div>
                      <div style={styles.optionListWrapper}>
                        {showPrioritySelect === index ? 
                        <CustomSelectInput hideDropdown={setShowPrioritySelect} index={index} options={priority} propertyType="priority" /> 
                        : null
                        }
                        
                      </div>
                    </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.customOptionWrapper}>
                      <div>
                        <p 
                        style={{
                          backgroundColor: task.taskStatus === taskStatus.INPROGRESS 
                          ? "#FFA000" 
                          : "#388E3C",
                        color: "white",
                        borderRadius:"15px",
                        display: "flex",
                        justifyContent: "center",
                        padding: "5px 15px",
                        cursor: "pointer",   
                        width: "max-content",  
                        margin: "8px 0px"                 
                        }} onClick={()=>{
                          setShowTaskStatusSelect(showTaskStatusSelect === index ? "":index);
                          setShowPrioritySelect("")
                        }
                        }>
                          {task.taskStatus} 
                        </p>
                      </div>
                      <div style={styles.optionListWrapper}>
                          {showTaskStatusSelect === index ? 
                          <CustomSelectInput hideDropdown={setShowTaskStatusSelect} index={index} options={taskStatus} propertyType="taskStatus" />
                          : null
                          }
                      </div>
                    </div>
                
                </td>
                <td style={styles.td}>
                  <div style={styles.tableDeleteButton} onClick={()=>{
                      setShowTaskStatusSelect("");
                      setShowPrioritySelect("")
                      setIsDelete({itemIndex:index,taskTitle:task.taskTitle})
                  }}>
                      Delete
                  </div>
                </td>

              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div style={styles.clearMemoryButtonWrapper}>
          <button
            style={styles.clearAllData}
            onClick={() => {
              setIsDelete({itemIndex:"",taskTitle:""})
            }}
            
          >
            Clear all data
          </button>
        </div>
        {isDelete === "" ? null:<div className="mainPopUp">
            <div className="popupWrapper">
              <p style={styles.deleteTitle}>
                Are you sure you want to delete <span style={{fontWeight:"bold"}}>{isDelete.taskTitle ? isDelete.taskTitle :" all data"}</span>!
              </p>
              <div style={styles.buttonWrapper}>
                <button style={styles.cancelButton} onClick={()=>setIsDelete("")}>
                  No
                </button>
                <button style={styles.deleteButton} onClick={()=>deleteHandler(isDelete.itemIndex ? isDelete.itemIndex : "" )}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        }


        {showTaskDetails === "" ? null:<div className="mainPopUp">
            <div className="popupWrapper">
              <p>
                <span style={{fontWeight:"bold"}}>{showTaskDetails.taskTitle}</span>
              </p>
              <p>
                {showTaskDetails.taskDescription}
              </p>
              <div style={styles.buttonWrapper}>
                <button style={styles.deleteButton} onClick={()=>setshowTaskDetails("")}>
                  Close
                </button>
              </div>
            </div>
          </div>
        }
        </>
        }
        

      </div>
  );
};
