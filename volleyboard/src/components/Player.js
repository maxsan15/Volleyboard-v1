import React from 'react';
import ReactDOM from 'react-dom/client';
import React from "react";
import Draggable from "react-draggable";

const Player = ({ name, position, onStop }) => {
  return (
    <Draggable position={position} onStop={(e, data) => onStop(data)}>
      <div
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
          fontWeight: "bold"
        }}
      >
        {name}
      </div>
    </Draggable>
  );
};

export default Player;
