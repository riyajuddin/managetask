import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const localStorageData = localStorage.getItem("tasks");
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  const addTask = (task) => {
    console.log("task context", task);
    setTasks([...tasks, task]);
  };
  const updateTask = (task) => {
    setTasks(task);
  }
  useEffect(() => {
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const localStorageData = localStorage.getItem("tasks");
    if (localStorageData) {
      setTasks(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
