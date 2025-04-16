import React, { useState, useRef, useEffect } from 'react';
import rotations from './Rotations';

const initialPlayers = [
  { id: 'S', x: 50, y: 50 },
  { id: 'OH1', x: 150, y: 50 },
  { id: 'M', x: 250, y: 50 },
  { id: 'OP', x: 50, y: 150 },
  { id: 'OH2', x: 150, y: 150 },
  { id: 'L', x: 250, y: 150 },
];

function Court({ currentRotation, formation }) {
  
  const courtRef = useRef(null);
  const [players, setPlayers] = useState(initialPlayers);
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    if (!rotations[currentRotation] || !rotations[currentRotation][formation]) {
      console.warn('Invalid rotation or formation:', currentRotation, formation);
      return;
    }
  
    const layout = rotations[currentRotation][formation];
    const clonedLayout = layout.map((p) => ({ ...p }));
    setPlayers(clonedLayout);
  }, [currentRotation, formation]);

  const handleMouseDown = (id) => (e) => {
    e.preventDefault();
    setDraggingId(id);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingId === null || !courtRef.current) return;

      const courtRect = courtRef.current.getBoundingClientRect();
      const newX = e.clientX - courtRect.left - 25;
      const newY = e.clientY - courtRect.top - 25;

      setPlayers((prev) =>
        prev.map((p) =>
          p.id === draggingId ? { ...p, x: newX, y: newY } : p
        )
      );
    };

    const handleMouseUp = () => {
      setDraggingId(null);
    };

    if (draggingId !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId]);
  

  return (
    <div className="Court" ref={courtRef}>
      <div className="Line" />

      {players.map((player) => (
        <div
          key={player.id}
          className="Player"
          onMouseDown={handleMouseDown(player.id)}
          style={{
            left: `${player.x}px`,
            top: `${player.y}px`,
          }}
        >
          {player.id}
        </div>
      ))}
    </div>
  );
}

export default Court;