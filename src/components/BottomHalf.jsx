import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RightSide from './RightSide';
import axios from 'axios';
import TopHalf from './TopHalf';

const BottomHalf = () => {
  const [taskText, setTaskText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
 
  const handleCreate = (e) => {
    e.preventDefault();
  const data = { title: taskText, description: descriptionText };
  alert("func")
    fetch("http://localhost:3000/app/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
          console.log("Inside the 200 status code");
                    // setTasks([...tasks, response.data]);
          console.log("Task created successfully");
          TopHalf.setShowAddCard(false);
          
        } else {
          return response.json().then((data) => {
            setErrorMsg(data.msg);
            // Handle registration error here
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle network error here
        setErrorMsg(error.message);
      });
  };


  return (
    <>
      <Card sx={{ minWidth: 400 }} style={{ marginTop:"50px",color: "grey" }}>
        <CardContent>
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Task"
              fullWidth= "true"
              multiline
              maxRows={6}
              variant="standard"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <br />
            <TextField
              id="standard-multiline-static"
              label="Description"
              fullWidth= "true"
              multiline
              rows={4}
              variant="standard"
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleCreate}>Create</Button>
        </CardActions>
      </Card>
      <RightSide  />
     {/*  {showDetails && <RightSide taskText={taskText} descriptionText={descriptionText} />} */}
    </>
  );
};

export default BottomHalf;
