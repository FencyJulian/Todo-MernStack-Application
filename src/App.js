import React,{useState} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import BottomHalf from "./components/BottomHalf";

const App = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
          fontSize: "30px",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        My Daily Task
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
          fontSize: "30px",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        <LeftSide />
      </div>
    </div>
  );
};

export default App;
