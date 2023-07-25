import React, { useState } from 'react';
import './style.css'; // Make sure to import the CSS file where you define the styles
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BottomHalf from './BottomHalf';
import TaskCard from './TaskCard';

const TopHalf = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [showViewAllCard, setShowViewAllCard] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const handleAddTask = () => {
    // Add task logic here
    setShowAddCard(true);
    setShowViewAllCard(false); // Hide the "View All Tasks" card when adding a new task
  };

  const handleViewAllTasks = async () => {
    try {
      // Fetch all tasks from the server API
      const response = await fetch("http://localhost:3000/app/getall");
      const data = await response.json();
      console.log(data);
      setAllTasks(data);
      console.log(allTasks);
      setShowAddCard(false);
      setShowViewAllCard(true);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
   // Function to remove the task from the state when it is deleted
  const handleDeleteTask = (deletedTaskId) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
  };

  return (
    <div className="topHalfContainer">
      <div className="buttonWrapper" style={{
       
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}>
        <Stack spacing={10} direction="row" >
          <Button variant="outlined" onClick={handleAddTask} style={{ width: "100px" }}>Add Task</Button>
          <Button variant="outlined" onClick={handleViewAllTasks}>View All Tasks</Button>
        </Stack>
      </div>
      {showAddCard && !showViewAllCard && <BottomHalf />} {/* Show Add Task card only when showAddCard is true and showViewAllCard is false */}
      {showViewAllCard && (
        <div>
          {/* Render the "View All Tasks" card */}
          {allTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask}/>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default TopHalf;
