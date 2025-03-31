// src/components/Court.tsx
import React, { useState, useEffect } from 'react';
import Player from './Player';

interface PlayerPosition {
  id: number;
  x: number;
  y: number;
}

// Predefined positions for each rotation (for demonstration)
const rotationPositions: { [key: number]: PlayerPosition[] } = {
  1: [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 250, y: 50 },
    { id: 4, x: 50, y: 150 },
    { id: 5, x: 150, y: 150 },
    { id: 6, x: 250, y: 150 },
  ],
  2: [
    { id: 1, x: 60, y: 60 },
    { id: 2, x: 160, y: 60 },
    { id: 3, x: 260, y: 60 },
    { id: 4, x: 60, y: 160 },
    { id: 5, x: 160, y: 160 },
    { id: 6, x: 260, y: 160 },
  ],
  3: [
    { id: 1, x: 70, y: 70 },
    { id: 2, x: 170, y: 70 },
    { id: 3, x: 270, y: 70 },
    { id: 4, x: 70, y: 170 },
    { id: 5, x: 170, y: 170 },
    { id: 6, x: 270, y: 170 },
  ],
  4: [
    { id: 1, x: 80, y: 80 },
    { id: 2, x: 180, y: 80 },
    { id: 3, x: 280, y: 80 },
    { id: 4, x: 80, y: 180 },
    { id: 5, x: 180, y: 180 },
    { id: 6, x: 280, y: 180 },
  ],
  5: [
    { id: 1, x: 90, y: 90 },
    { id: 2, x: 190, y: 90 },
    { id: 3, x: 290, y: 90 },
    { id: 4, x: 90, y: 190 },
    { id: 5, x: 190, y: 190 },
    { id: 6, x: 290, y: 190 },
  ],
  6: [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 200, y: 100 },
    { id: 3, x: 300, y: 100 },
    { id: 4, x: 100, y: 200 },
    { id: 5, x: 200, y: 200 },
    { id: 6, x: 300, y: 200 },
  ],
};

interface CourtProps {
  rotation: number;
}

const Court: React.FC<CourtProps> = ({ rotation }) => {
  const [players, setPlayers] = useState<PlayerPosition[]>(rotationPositions[1]);

  useEffect(() => {
    setPlayers(rotationPositions[rotation]);
  }, [rotation]);

  const updatePlayerPosition = (id: number, newX: number, newY: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, x: newX, y: newY } : player
      )
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '90%',         // Court takes up 90% of the available width
        maxWidth: '600px',     // But no wider than 600px
        aspectRatio: '4 / 3',  // Maintains a 4:3 ratio automatically
        border: '2px solid #000',
        margin: '20px auto',
        // Grid background: vertical lines for 3 columns and horizontal lines for 2 rows
        backgroundImage: `
          linear-gradient(to right, #ccc 1px, transparent 1px),
          linear-gradient(to bottom, #ccc 1px, transparent 1px)
        `,
        backgroundSize: '33.33% 100%, 100% 50%',
      }}
    >
      {players.map((player) => (
        <Player
          key={player.id}
          id={player.id}
          x={player.x}
          y={player.y}
          updatePosition={updatePlayerPosition}
        />
      ))}
    </div>
  );
};

export default Court;