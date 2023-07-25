import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const TaskCard = ({key, task, onDelete  }) => {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State variables to store the edited values
  const [originalId] = useState(key);
  console.log(originalId);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleUpdateStatus = async (taskId) => { // Pass taskId as an argument
    try {
      setUpdatingStatus(true);

      // Make the API request to update the task
      const response = await fetch(`http://localhost:3000/app/update/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          status: editedStatus
        }),
      });

      // Handle the response as needed
      const updatedTask = await response.json();
      console.log('Updated Task:', updatedTask);

      // Update the current values with the edited values after the API call
      task.title = editedTitle;
      task.description = editedDescription;
      task.status = editedStatus;

      // Exit edit mode after saving
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

const handleDelete = async (taskId) => {
    try {
      // Make the API request to delete the task
      const response = await fetch(`http://localhost:3000/app/delete/${taskId}`, {
        method: 'DELETE',
      });

      // Check if the request was successful
      if (response.ok) {
        // Call the onDelete function to remove the task from the parent component
        onDelete(taskId);
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  return (
    <Card className="task-card" sx={{ minWidth: 350 }} style={{ marginLeft: "100px", marginTop: "50px", color: "grey" }}>
      <CardContent>
        {isEditing ? ( // Render input fields in edit mode
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <input
              type="text"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            />
          </>
        ) : ( // Render the fields as plain text
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </>
        )}
        {isEditing ? ( // Show the "Done" button in edit mode
          <Button onClick={() => handleUpdateStatus(task._id)} disabled={updatingStatus}>
            {updatingStatus ? 'Updating...' : 'Done'}
          </Button>
        ) : ( // Show the "Edit" button when not in edit mode
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
        <Button onClick={() => handleDelete(task._id)}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
