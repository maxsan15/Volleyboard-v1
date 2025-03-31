// src/components/Player.tsx
import React, { useState, useRef } from 'react';

interface PlayerProps {
  id: number;
  x: number;
  y: number;
  updatePosition: (id: number, newX: number, newY: number) => void;
}

const Player: React.FC<PlayerProps> = ({ id, x, y, updatePosition }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const offsetRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 0, offsetY: 0 });
  const containerRectRef = useRef<DOMRect | null>(null);

  // Initiate dragging: capture pointer and calculate offset relative to container
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);

    // Get container bounding rectangle; default to null if undefined
    const containerRect = playerRef.current?.offsetParent?.getBoundingClientRect();
    containerRectRef.current = containerRect || null;

    // Compute offset relative to container coordinate system
    if (containerRectRef.current) {
      offsetRef.current = {
        offsetX: e.clientX - containerRectRef.current.left - x,
        offsetY: e.clientY - containerRectRef.current.top - y,
      };
    }
  };

  // Update player's position while dragging using container coordinates
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !containerRectRef.current) return;
    const newX = e.clientX - containerRectRef.current.left - offsetRef.current.offsetX;
    const newY = e.clientY - containerRectRef.current.top - offsetRef.current.offsetY;
    updatePosition(id, newX, newY);
  };

  // End dragging and release pointer capture
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={playerRef}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'dodgerblue',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'grab',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {id}
    </div>
  );
};

export default Player;