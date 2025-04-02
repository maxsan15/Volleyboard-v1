// src/components/Player.tsx
import React, { useState, useRef } from 'react';

export interface PlayerData {
  id: string;
  x: number;    // % of container width
  y: number;    // % of container height
  color: string;
}

interface PlayerProps {
  id: string;
  x: number;
  y: number;
  color: string;
  updatePosition: (id: string, newX: number, newY: number) => void;
}

const Player: React.FC<PlayerProps> = ({ id, x, y, color, updatePosition }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ offsetX: 0, offsetY: 0 });
  const containerRectRef = useRef<DOMRect | null>(null);

  // Adjust player size based on screen width.
  const playerSize =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 50;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    const containerRect =
      playerRef.current?.offsetParent?.getBoundingClientRect() || null;
    containerRectRef.current = containerRect;
    if (containerRect) {
      const pointerXPercent =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const pointerYPercent =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;
      offsetRef.current = {
        offsetX: pointerXPercent - x,
        offsetY: pointerYPercent - y,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !containerRectRef.current) return;
    const { left, top, width, height } = containerRectRef.current;
    const pointerXPercent = ((e.clientX - left) / width) * 100;
    const pointerYPercent = ((e.clientY - top) / height) * 100;
    const newX = pointerXPercent - offsetRef.current.offsetX;
    const newY = pointerYPercent - offsetRef.current.offsetY;
    updatePosition(id, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={playerRef}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${playerSize}px`,
        height: `${playerSize}px`,
        borderRadius: '50%',
        backgroundColor: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        fontWeight: 'bold',
        transform: 'translate(-50%, -50%)',
        fontSize: playerSize / 2.5,
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




/** const RotationData = {
  rotations: [
    { // Rotation 1
        positions: [
            { name: "S", x: 500, y: 450 },      //Position 1
            { name: "OH1", x: 500, y: 250 },    //Position 2
            { name: "M2", x: 400, y: 250 },     //Position 3
            { name: "OP", x: 300, y: 250 },     //Position 4
            { name: "OH2", x: 300, y: 450 },    //Position 5
            { name: "L", x: 400, y: 450 }       //Position 6
        ],
        servePositions: [
            { name: "S", x: 500, y: 575},       //Position 1
            { name: "OH1", x: 425, y: 250 },    //Position 2
            { name: "M2", x: 400, y: 200 },     //Position 3
            { name: "OP", x: 375, y: 250 },     //Position 4
            { name: "OH2", x: 400, y: 450 },    //Position 5
            { name: "L", x: 450, y: 375 }       //Position 6
        ],
        receivePositions: [
            { name: "S", x: 510, y: 455 },      //Position 1
            { name: "OH1", x: 475, y: 425 },    //Position 2
            { name: "M2", x: 280, y: 250 },     //Position 3
            { name: "OP", x: 265, y: 200 },     //Position 4
            { name: "OH2", x: 325, y: 425 },    //Position 5
            { name: "L", x: 400, y: 425 }       //Position 6
        ],
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_1"
    },

    { // Rotation 2
        positions: [
            { name: "OH1", x: 500, y: 450 },    //Position 1
            { name: "M2", x: 500, y: 250 },     //Position 2
            { name: "OP", x: 400, y: 250 },     //Position 3
            { name: "OH2", x: 300, y: 250 },    //Position 4
            { name: "L", x: 300, y: 450 },      //Position 5
            { name: "S", x: 400, y: 450 }       //Position 6
        ],
        servePositions: [
            { name: "OH1", x: 500, y: 575 },    //Position 1
            { name: "M2", x: 400, y: 200 },     //Position 2
            { name: "OP", x: 375, y: 250 },     //Position 3
            { name: "OH2", x: 330, y: 200 },    //Position 4
            { name: "L", x: 300, y: 375 },      //Position 5
            { name: "S", x: 500, y: 375 }       //Position 6
        ],
        receivePositions: [
            { name: "OH1", x: 500, y: 425 },    //Position 1
            { name: "M2", x: 525, y: 275 },     //Position 2
            { name: "OP", x: 500, y: 200 },     //Position 3
            { name: "OH2", x: 300, y: 400 },    //Position 4
            { name: "L", x: 400, y: 425 },      //Position 5
            { name: "S", x: 450, y: 250 }       //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_2"
    },

    { // Rotation 3
        positions: [
            { name: "L", x: 500, y: 450 },       //Position 1
            { name: "OP", x: 500, y: 250 },      //Position 2
            { name: "OH2", x: 400, y: 250 },     //Position 3
            { name: "M1", x: 300, y: 250 },      //Position 4
            { name: "S", x: 300, y: 450 },       //Position 5
            { name: "OH1", x: 400, y: 450 }      //Position 6
        ],
        servePositions: [
            { name: "M2", x: 500, y: 575 },      //Position 1
            { name: "OP", x: 475, y: 200 },      //Position 2
            { name: "OH2", x: 425, y: 250 },     //Position 3
            { name: "M1", x: 400, y: 200 },      //Position 4
            { name: "S", x: 350, y: 375 },       //Position 5
            { name: "OH1", x: 400, y: 450 }      //Position 6
        ],
        receivePositions: [
            { name: "L", x: 475, y: 425 },       //Position 1
            { name: "OP", x: 525, y: 275 },      //Position 2
            { name: "OH2", x: 300, y: 400 },     //Position 3
            { name: "M1", x: 275, y: 250 },      //Position 4
            { name: "S", x: 350, y: 275 },       //Position 5
            { name: "OH1", x: 400, y: 425 }      //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_3"
    },

    { // Rotation 4
        positions: [
            { name: "OP", x: 500, y: 450 },      //Position 1
            { name: "OH2", x: 500, y: 250 },     //Position 2
            { name: "M1", x: 400, y: 250 },      //Position 3
            { name: "S", x: 300, y: 250 },       //Position 4
            { name: "OH1", x: 300, y: 450 },     //Position 5
            { name: "L", x: 400, y: 450 }        //Position 6
        ],
        servePositions: [
            { name: "OP", x: 500, y: 575 },      //Position 1
            { name: "OH2", x: 425, y: 250 },     //Position 2
            { name: "M1", x: 400, y: 200 },      //Position 3
            { name: "S", x: 375, y: 250 },       //Position 4
            { name: "OH1", x: 400, y: 450 },     //Position 5
            { name: "L", x: 450, y: 375 }        //Position 6
        ],
        receivePositions: [
            { name: "OP", x: 510, y: 525 },      //Position 1
            { name: "OH2", x: 325, y: 400 },     //Position 2
            { name: "M1", x: 280, y: 250 },      //Position 3
            { name: "S", x: 265, y: 200 },       //Position 4
            { name: "OH1", x: 475, y: 425 },     //Position 5
            { name: "L", x: 400, y: 425 }        //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_4"
    },

    { // Rotation 5
        positions: [
            { name: "OH2", x: 500, y: 450 },     //Position 1
            { name: "M1", x: 500, y: 250 },      //Position 2
            { name: "S", x: 400, y: 250 },       //Position 3
            { name: "OH1", x: 300, y: 250 },     //Position 4
            { name: "L", x: 300, y: 450 },       //Position 5
            { name: "OP", x: 400, y: 450 }       //Position 6
        ],
        servePositions: [
            { name: "OH2", x: 500, y: 575 },     //Position 1
            { name: "M1", x: 400, y: 200 },      //Position 2
            { name: "S", x: 375, y: 250 },       //Position 3
            { name: "OH1", x: 330, y: 200 },     //Position 4
            { name: "L", x: 300, y: 375 },       //Position 5
            { name: "OP", x: 500, y: 375 }       //Position 6
        ],
        receivePositions: [
            { name: "OH2", x: 475, y: 425 },     //Position 1
            { name: "M1", x: 525, y: 275 },      //Position 2
            { name: "S", x: 450, y: 200 },       //Position 3
            { name: "OH1", x: 325, y: 400 },     //Position 4
            { name: "L", x: 400, y: 425 },       //Position 5
            { name: "OP", x: 450, y: 525 }       //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_5"
    },

    { // Rotation 6
        positions: [
            { name: "M1", x: 500, y: 450 },      //Position 1
            { name: "S", x: 500, y: 250 },       //Position 2
            { name: "OH1", x: 400, y: 250 },     //Position 3
            { name: "M2", x: 300, y: 250 },      //Position 4
            { name: "OP", x: 300, y: 450 },      //Position 5
            { name: "OH2", x: 400, y: 450 }      //Position 6
        ],
        servePositions: [
            { name: "M1", x: 500, y: 575 },      //Position 1
            { name: "S", x: 475, y: 200 },       //Position 2
            { name: "OH1", x: 425, y: 250 },     //Position 3
            { name: "M2", x: 400, y: 200 },      //Position 4
            { name: "OP", x: 350, y: 375 },      //Position 5
            { name: "OH2", x: 400, y: 450 }      //Position 6
        ],
        receivePositions: [
            { name: "L", x: 475, y: 425 },       //Position 1
            { name: "S", x: 450, y: 200 },       //Position 2
            { name: "OH1", x: 325, y: 400 },     //Position 3
            { name: "M2", x: 275, y: 275 },      //Position 4
            { name: "OP", x: 350, y: 525 },      //Position 5
            { name: "OH2", x: 400, y: 425 }      //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_6"
    }, */

