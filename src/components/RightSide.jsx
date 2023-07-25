import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const RightSide = ({ tasks }) => {
  return (
    <div>
      {/* {tasks.map((task) => (
        <Card key={task._id} sx={{ minWidth: 150, margin: "10px", color: "grey" }}>
          <CardContent>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </CardContent>
        </Card>
      ))} */}
    </div>
  );
};

export default RightSide;
