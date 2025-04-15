import React, { useState } from "react";
import Player from "./Player";

const formations = {
  default: [
    { id: 1, name: "Setter", x: 100, y: 100 },
    { id: 2, name: "Outside Hitter", x: 200, y: 100 },
    { id: 3, name: "Middle Blocker", x: 300, y: 100 },
    { id: 4, name: "Opposite", x: 100, y: 300 },
    { id: 5, name: "Libero", x: 200, y: 300 },
    { id: 6, name: "Defensive Specialist", x: 300, y: 300 },
  ],
  serve: [
    { id: 1, name: "Setter", x: 250, y: 100 },
    { id: 2, name: "Outside Hitter", x: 150, y: 150 },
    { id: 3, name: "Middle Blocker", x: 350, y: 150 },
    { id: 4, name: "Opposite", x: 100, y: 250 },
    { id: 5, name: "Libero", x: 250, y: 250 },
    { id: 6, name: "Defensive Specialist", x: 400, y: 300 },
  ],
  receive: [
    { id: 1, name: "Setter", x: 300, y: 200 },
    { id: 2, name: "Outside Hitter", x: 100, y: 100 },
    { id: 3, name: "Middle Blocker", x: 200, y: 200 },
    { id: 4, name: "Opposite", x: 400, y: 100 },
    { id: 5, name: "Libero", x: 150, y: 300 },
    { id: 6, name: "Defensive Specialist", x: 350, y: 300 },
  ]
};

const Rotations = () => {
  const [players, setPlayers] = useState(formations.default);

  const updatePlayerPosition = (id, data) => {
    setPlayers(prev =>
      prev.map(p => p.id === id ? { ...p, x: data.x, y: data.y } : p)
    );
  };

  const switchFormation = (type) => {
    setPlayers(formations[type].map(p => ({ ...p })));
  };

  return (
    <>
      <div className="mb-3">
        <button className="btn btn-primary m-1" onClick={() => switchFormation("default")}>Default</button>
        <button className="btn btn-secondary m-1" onClick={() => switchFormation("serve")}>Serve</button>
        <button className="btn btn-success m-1" onClick={() => switchFormation("receive")}>Receive</button>
      </div>

      <div
        style={{
          position: "relative",
          width: "500px",
          height: "400px",
          margin: "auto",
          backgroundColor: "#f0f0f0",
          border: "2px solid #333"
        }}
      >
        {players.map((player) => (
          <Player
            key={player.id}
            name={player.name}
            position={{ x: player.x, y: player.y }}
            onStop={(data) => updatePlayerPosition(player.id, data)}
          />
        ))}
      </div>
    </>
  );
};

export default Rotations;